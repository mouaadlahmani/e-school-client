import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { FiClock, FiCalendar, FiEye, FiArrowLeft } from 'react-icons/fi';
import ReactPlayer from 'react-player'; // For YouTube embeds

const Article = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`/articles/${slug}`);

        console.log(response.data);
        setArticle(response.data.data);

      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Article introuvable ou une erreur s'est produite."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  // Helper function to render text with links
  const renderTextWithLinks = (text, links = []) => {
    if (!links || links.length === 0) {
      return text;
    }

    // Sort links by startIndex in descending order to avoid index shifting issues
    const sortedLinks = [...links].sort((a, b) => b.startIndex - a.startIndex);

    let result = text;
    sortedLinks.forEach(link => {
      const beforeLink = result.substring(0, link.startIndex);
      const afterLink = result.substring(link.endIndex);
      const linkElement = `<a href="${link.url}" ${link.openInNewTab ? 'target="_blank" rel="noopener noreferrer"' : ''} class="text-[#21B573] hover:text-[#1a9660] underline inline-flex items-center gap-1">${link.text}${link.openInNewTab ? '<span class="text-xs">↗</span>' : ''}</a>`;
      result = beforeLink + linkElement + afterLink;
    });

    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  const renderContentBlock = (block, index) => {
    // Sort content blocks by order if they have order property
    if (!block) return null;

    switch (block.type) {
      case 'text':
        return (
          <div
            key={index}
            className="mb-6"
            style={{
              textAlign: block.formatting?.alignment || 'left',
              color: block.formatting?.color || '#374151',
              fontSize: block.formatting?.fontSize || '1rem'
            }}
          >
            <p
              style={{
                fontWeight: block.formatting?.bold ? 'bold' : 'normal',
                fontStyle: block.formatting?.italic ? 'italic' : 'normal',
                textDecoration: block.formatting?.underline ? 'underline' : 'none'
              }}
            >
              {renderTextWithLinks(block.text, block.links)}
            </p>
          </div>
        );

      case 'image':
        return (
          <figure key={index} className={`my-8 ${block.image?.alignment === 'center' ? 'text-center' :
            block.image?.alignment === 'right' ? 'text-right' : ''}`}>
            <img
              src={block.image?.url}
              alt={block.image?.alt || ''}
              className={`rounded-lg shadow-sm ${block.image?.alignment === 'center' ? 'mx-auto' :
                block.image?.alignment === 'right' ? 'ml-auto' : ''}`}
              style={{
                maxWidth: '100%',
                height: block.image?.height || 'auto',
                width: block.image?.width || '100%'
              }}
            />
            {block.image?.caption && (
              <figcaption className="mt-2 text-sm text-gray-500 italic">
                {block.image.caption}
              </figcaption>
            )}
          </figure>
        );

      case 'youtube':
        return (
          <div key={index} className="my-8">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-sm">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${block.youtube?.videoId}`}
                width={block.youtube?.width || '100%'}
                height={block.youtube?.height || '400px'}
                controls={block.youtube?.controls !== false}
                playing={block.youtube?.autoplay || false}
                config={{
                  youtube: {
                    playerVars: {
                      start: block.youtube?.startTime || 0
                    }
                  }
                }}
              />
            </div>
            {block.youtube?.title && (
              <p className="mt-3 text-sm font-medium text-gray-700 text-center">
                {block.youtube.title}
              </p>
            )}
          </div>
        );

      case 'heading':
        const HeadingTag = `h${block.heading?.level || 2}`;
        return React.createElement(
          HeadingTag,
          {
            key: index,
            className: `my-6 font-bold text-gray-800 ${block.heading?.level === 1 ? 'text-3xl' :
              block.heading?.level === 2 ? 'text-2xl' :
                block.heading?.level === 3 ? 'text-xl' :
                  block.heading?.level === 4 ? 'text-lg' :
                    block.heading?.level === 5 ? 'text-base' : 'text-sm'
              }`
          },
          block.heading?.text
        );

      case 'quote':
        return (
          <blockquote key={index} className="my-8 pl-6 border-l-4 border-[#21B573] bg-gray-50 py-4 rounded-r-lg">
            <p className="text-lg text-gray-700 italic mb-2">{block.quote?.text}</p>
            {(block.quote?.author || block.quote?.source) && (
              <footer className="text-sm text-gray-500">
                {block.quote?.author && <span>— {block.quote.author}</span>}
                {block.quote?.source && (
                  <cite className="ml-2 not-italic">({block.quote.source})</cite>
                )}
              </footer>
            )}
          </blockquote>
        );

      case 'list':
        const ListTag = block.list?.type === 'ordered' ? 'ol' : 'ul';
        return (
          <ListTag
            key={index}
            className={`my-6 ${block.list?.type === 'ordered' ? 'list-decimal' : 'list-disc'
              } pl-6 space-y-2`}
          >
            {block.list?.items?.map((item, i) => (
              <li key={i} className="text-gray-700 leading-relaxed">
                {item}
              </li>
            ))}
          </ListTag>
        );

      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Sort content blocks by order before rendering
  const sortedContent = article?.content?.sort((a, b) => (a.order || 0) - (b.order || 0)) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto px-4 py-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#21B573] hover:text-[#1a9660] mb-6 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Retour aux articles
        </button>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#21B573]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={() => navigate('/blog')}
              className="px-6 py-2 bg-[#21B573] text-white rounded-lg hover:bg-[#1a9660] transition-colors"
            >
              Retour au blog
            </button>
          </div>
        ) : article ? (
          <article className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Article Header */}
            <div className="p-6 md:p-8">

              <h1 className="text-3xl md:text-4xl text-center font-bold text-gray-900 mb-4">
                {article.title}
              </h1>

              <p className="text-xl text-gray-600 text-center leading-relaxed">
                {article.description}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-200">

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <FiCalendar size={14} />
                    <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiClock size={14} />
                    <span>{article.readingTime} min de lecture</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 md:p-8 prose max-w-none">
              {sortedContent.map((block, index) => renderContentBlock(block, index))}
            </div>

            {/* Article Footer */}
            <div className="p-6 md:p-8 border-t border-gray-200">

              {/* Article Status Indicator (for admin/debugging) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                  <p className="text-xs text-gray-600">
                    <strong>Status:</strong> {article.status} |
                    <strong> Created:</strong> {formatDate(article.createdAt)} |
                    <strong> Updated:</strong> {formatDate(article.updatedAt)}
                    {article.scheduledAt && (
                      <span> | <strong>Scheduled:</strong> {formatDate(article.scheduledAt)}</span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </article>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">Aucun article trouvé.</p>
            <button
              onClick={() => navigate('/blog')}
              className="text-[#21B573] hover:underline"
            >
              Retour au blog
            </button>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Articles similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <div
                  key={relatedArticle._id}
                  onClick={() => navigate(`/blog/${relatedArticle.slug}`)}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow overflow-hidden"
                >
                  {relatedArticle.thumbnail?.url && (
                    <img
                      src={relatedArticle.thumbnail.url}
                      alt={relatedArticle.thumbnail.alt || relatedArticle.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <span className="inline-block bg-[#21B573] text-white px-2 py-1 rounded-full text-xs font-medium mb-2">
                      {relatedArticle.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {relatedArticle.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{formatDate(relatedArticle.publishedAt || relatedArticle.createdAt)}</span>
                      <span>{relatedArticle.readingTime} min</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Article;