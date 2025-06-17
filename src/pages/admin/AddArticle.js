import React, { useState, useEffect } from "react";
import {
  Plus, Trash2, MoveUp, MoveDown, Image, Video, Type, Quote, List, Heading,
  Save, X, Eye, Bold, Italic,
  Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify,
} from "lucide-react";

const AddArticle = ({ article, onSave, onCancel }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: [],
    category: "",
    thumbnail: {
      url: "",
      alt: "",
      caption: ""
    },
    status: "draft",
    scheduledAt: ""
  });

  const [activeTab, setActiveTab] = useState("content");
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (article) {
      setForm({
        title: article.title || "",
        description: article.description || "",
        content: article.content || [],
        category: article.category || "",
        thumbnail: article.thumbnail || { url: "", alt: "", caption: "" },
        status: article.status || "draft",
        scheduledAt: article.scheduledAt ? new Date(article.scheduledAt).toISOString().slice(0, 16) : ""
      });
    }
  }, [article]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const addContentBlock = (type) => {
    const newBlock = {
      type,
      order: form.content.length + 1,
      text: "",
      formatting: {
        bold: false,
        italic: false,
        underline: false,
        color: "#000000",
        fontSize: "16px",
        alignment: "left"
      },
      links: [],
      image: {
        url: "",
        alt: "",
        caption: "",
        width: "100%",
        height: "auto",
        alignment: "center"
      },
      youtube: {
        videoId: "",
        title: "",
        width: "100%",
        height: "315px",
        autoplay: false,
        controls: true,
        startTime: 0
      },
      heading: {
        level: 2,
        text: ""
      },
      quote: {
        text: "",
        author: "",
        source: ""
      },
      list: {
        type: "unordered",
        items: [""]
      }
    };

    setForm(prev => ({
      ...prev,
      content: [...prev.content, newBlock]
    }));
  };

  const updateContentBlock = (index, field, value) => {
    setForm(prev => ({
      ...prev,
      content: prev.content.map((block, i) => {
        if (i === index) {
          if (field.includes('.')) {
            const [parent, child] = field.split('.');
            return {
              ...block,
              [parent]: {
                ...block[parent],
                [child]: value
              }
            };
          }
          return { ...block, [field]: value };
        }
        return block;
      })
    }));
  };

  const removeContentBlock = (index) => {
    setForm(prev => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index).map((block, i) => ({
        ...block,
        order: i + 1
      }))
    }));
  };

  const moveContentBlock = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= form.content.length) return;

    setForm(prev => {
      const newContent = [...prev.content];
      [newContent[index], newContent[newIndex]] = [newContent[newIndex], newContent[index]];
      return {
        ...prev,
        content: newContent.map((block, i) => ({ ...block, order: i + 1 }))
      };
    });
  };

  const addListItem = (blockIndex) => {
    setForm(prev => ({
      ...prev,
      content: prev.content.map((block, i) => {
        if (i === blockIndex && block.type === 'list') {
          return {
            ...block,
            list: {
              ...block.list,
              items: [...block.list.items, ""]
            }
          };
        }
        return block;
      })
    }));
  };

  const updateListItem = (blockIndex, itemIndex, value) => {
    setForm(prev => ({
      ...prev,
      content: prev.content.map((block, i) => {
        if (i === blockIndex && block.type === 'list') {
          return {
            ...block,
            list: {
              ...block.list,
              items: block.list.items.map((item, j) => j === itemIndex ? value : item)
            }
          };
        }
        return block;
      })
    }));
  };

  const removeListItem = (blockIndex, itemIndex) => {
    setForm(prev => ({
      ...prev,
      content: prev.content.map((block, i) => {
        if (i === blockIndex && block.type === 'list') {
          return {
            ...block,
            list: {
              ...block.list,
              items: block.list.items.filter((_, j) => j !== itemIndex)
            }
          };
        }
        return block;
      })
    }));
  };

  const handleSubmit = () => {
    if (!form.title.trim()) return alert("Title is required");
    if (!form.description.trim()) return alert("Description is required");
    if (!form.category.trim()) return alert("Category is required");

    onSave(form);
  };

  const renderContentBlock = (block, index) => {
    const blockTypeConfig = {
      text: { icon: Type, color: "blue", label: "Text Block" },
      image: { icon: Image, color: "green", label: "Image Block" },
      youtube: { icon: Video, color: "red", label: "YouTube Video" },
      heading: { icon: Heading, color: "purple", label: "Heading" },
      quote: { icon: Quote, color: "yellow", label: "Quote" },
      list: { icon: List, color: "indigo", label: "List" }
    };

    const config = blockTypeConfig[block.type] || blockTypeConfig.text;
    const IconComponent = config.icon;

    switch (block.type) {
      case 'text':
        return (
          <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-${config.color}-100 rounded-lg`}>
                  <IconComponent size={18} className={`text-${config.color}-600`} />
                </div>
                <h4 className="font-semibold text-gray-800">{config.label}</h4>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => moveContentBlock(index, 'up')}
                  disabled={index === 0}
                  className={`p-2 rounded-lg transition-colors ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}
                >
                  <MoveUp size={16} />
                </button>
                <button
                  onClick={() => moveContentBlock(index, 'down')}
                  disabled={index === form.content.length - 1}
                  className={`p-2 rounded-lg transition-colors ${index === form.content.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}
                >
                  <MoveDown size={16} />
                </button>
                <button
                  onClick={() => removeContentBlock(index)}
                  className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <textarea
                value={block.text}
                onChange={(e) => updateContentBlock(index, 'text', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                placeholder="Enter your text content..."
              />

              <div className="flex flex-wrap gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateContentBlock(index, 'formatting.bold', !block.formatting.bold)}
                    className={`p-2 rounded-lg transition-colors ${block.formatting.bold ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-200'}`}
                  >
                    <Bold size={16} />
                  </button>
                  <button
                    onClick={() => updateContentBlock(index, 'formatting.italic', !block.formatting.italic)}
                    className={`p-2 rounded-lg transition-colors ${block.formatting.italic ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-200'}`}
                  >
                    <Italic size={16} />
                  </button>
                  <button
                    onClick={() => updateContentBlock(index, 'formatting.underline', !block.formatting.underline)}
                    className={`p-2 rounded-lg transition-colors ${block.formatting.underline ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-200'}`}
                  >
                    <Underline size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={block.formatting.color}
                    onChange={(e) => updateContentBlock(index, 'formatting.color', e.target.value)}
                    className="w-8 h-8 rounded border border-gray-200 cursor-pointer"
                  />
                  <select
                    value={block.formatting.fontSize}
                    onChange={(e) => updateContentBlock(index, 'formatting.fontSize', e.target.value)}
                    className="border border-gray-200 rounded px-3 py-1 text-sm"
                  >
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px">16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                    <option value="24px">24px</option>
                  </select>
                </div>

                <div className="flex items-center gap-1">
                  {['left', 'center', 'right', 'justify'].map((align) => {
                    const AlignIcon = align === 'left' ? AlignLeft : align === 'center' ? AlignCenter : align === 'right' ? AlignRight : AlignJustify;
                    return (
                      <button
                        key={align}
                        onClick={() => updateContentBlock(index, 'formatting.alignment', align)}
                        className={`p-2 rounded-lg transition-colors ${block.formatting.alignment === align ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-200'}`}
                      >
                        <AlignIcon size={16} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );

      case 'image':
        return (
          <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-${config.color}-100 rounded-lg`}>
                  <IconComponent size={18} className={`text-${config.color}-600`} />
                </div>
                <h4 className="font-semibold text-gray-800">{config.label}</h4>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => moveContentBlock(index, 'up')} disabled={index === 0}>
                  <MoveUp size={16} className={index === 0 ? 'text-gray-300' : 'text-gray-500 hover:text-blue-600'} />
                </button>
                <button onClick={() => moveContentBlock(index, 'down')} disabled={index === form.content.length - 1}>
                  <MoveDown size={16} className={index === form.content.length - 1 ? 'text-gray-300' : 'text-gray-500 hover:text-blue-600'} />
                </button>
                <button onClick={() => removeContentBlock(index)}>
                  <Trash2 size={16} className="text-gray-500 hover:text-red-600" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={block.image.url}
                    onChange={(e) => updateContentBlock(index, 'image.url', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
                  <input
                    type="text"
                    value={block.image.alt}
                    onChange={(e) => updateContentBlock(index, 'image.alt', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Descriptive alt text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                  <input
                    type="text"
                    value={block.image.caption}
                    onChange={(e) => updateContentBlock(index, 'image.caption', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Image caption"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alignment</label>
                  <select
                    value={block.image.alignment}
                    onChange={(e) => updateContentBlock(index, 'image.alignment', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>

              {block.image.url && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={block.image.url}
                    alt={block.image.alt}
                    className="max-w-xs h-auto rounded-lg shadow-sm"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 'youtube':
        return (
          <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-${config.color}-100 rounded-lg`}>
                  <IconComponent size={18} className={`text-${config.color}-600`} />
                </div>
                <h4 className="font-semibold text-gray-800">{config.label}</h4>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => moveContentBlock(index, 'up')} disabled={index === 0}>
                  <MoveUp size={16} className={index === 0 ? 'text-gray-300' : 'text-gray-500 hover:text-blue-600'} />
                </button>
                <button onClick={() => moveContentBlock(index, 'down')} disabled={index === form.content.length - 1}>
                  <MoveDown size={16} className={index === form.content.length - 1 ? 'text-gray-300' : 'text-gray-500 hover:text-blue-600'} />
                </button>
                <button onClick={() => removeContentBlock(index)}>
                  <Trash2 size={16} className="text-gray-500 hover:text-red-600" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video ID</label>
                  <input
                    type="text"
                    value={block.youtube.videoId}
                    onChange={(e) => updateContentBlock(index, 'youtube.videoId', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="dQw4w9WgXcQ"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={block.youtube.title}
                    onChange={(e) => updateContentBlock(index, 'youtube.title', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Video title"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={block.youtube.autoplay}
                    onChange={(e) => updateContentBlock(index, 'youtube.autoplay', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Autoplay</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={block.youtube.controls}
                    onChange={(e) => updateContentBlock(index, 'youtube.controls', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Show Controls</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'heading':
        return (
          <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-${config.color}-100 rounded-lg`}>
                  <IconComponent size={18} className={`text-${config.color}-600`} />
                </div>
                <h4 className="font-semibold text-gray-800">{config.label}</h4>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => moveContentBlock(index, 'up')} disabled={index === 0}>
                  <MoveUp size={16} className={index === 0 ? 'text-gray-300' : 'text-gray-500 hover:text-blue-600'} />
                </button>
                <button onClick={() => moveContentBlock(index, 'down')} disabled={index === form.content.length - 1}>
                  <MoveDown size={16} className={index === form.content.length - 1 ? 'text-gray-300' : 'text-gray-500 hover:text-blue-600'} />
                </button>
                <button onClick={() => removeContentBlock(index)}>
                  <Trash2 size={16} className="text-gray-500 hover:text-red-600" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Heading Text</label>
                  <input
                    type="text"
                    value={block.heading.text}
                    onChange={(e) => updateContentBlock(index, 'heading.text', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter heading text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <select
                    value={block.heading.level}
                    onChange={(e) => updateContentBlock(index, 'heading.level', parseInt(e.target.value))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={1}>H1</option>
                    <option value={2}>H2</option>
                    <option value={3}>H3</option>
                    <option value={4}>H4</option>
                    <option value={5}>H5</option>
                    <option value={6}>H6</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'quote':
        return (
          <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-${config.color}-100 rounded-lg`}>
                  <IconComponent size={18} className={`text-${config.color}-600`} />
                </div>
                <h4 className="font-semibold text-gray-800">{config.label}</h4>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => moveContentBlock(index, 'up')} disabled={index === 0}>
                  <MoveUp size={16} className={index === 0 ? 'text-gray-300' : 'text-gray-500 hover:text-blue-600'} />
                </button>
                <button onClick={() => moveContentBlock(index, 'down')} disabled={index === form.content.length - 1}>
                  <MoveDown size={16} className={index === form.content.length - 1 ? 'text-gray-300' : 'text-gray-500 hover:text-blue-600'} />
                </button>
                <button onClick={() => removeContentBlock(index)}>
                  <Trash2 size={16} className="text-gray-500 hover:text-red-600" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quote Text</label>
                <textarea
                  value={block.quote.text}
                  onChange={(e) => updateContentBlock(index, 'quote.text', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Enter quote text"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={block.quote.author}
                    onChange={(e) => updateContentBlock(index, 'quote.author', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Quote author"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                  <input
                    type="text"
                    value={block.quote.source}
                    onChange={(e) => updateContentBlock(index, 'quote.source', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Quote source"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'list':
        return (
          <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-${config.color}-100 rounded-lg`}>
                  <IconComponent size={18} className={`text-${config.color}-600`} />
                </div>
                <h4 className="font-semibold text-gray-800">{config.label}</h4>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => moveContentBlock(index, 'up')} disabled={index === 0}>
                  <MoveUp size={16} className={index === 0 ? 'text-gray-300' : 'text-gray-500 hover:text-blue-600'} />
                </button>
                <button onClick={() => moveContentBlock(index, 'down')} disabled={index === form.content.length - 1}>
                  <MoveDown size={16} className={index === form.content.length - 1 ? 'text-gray-300' : 'text-gray-500 hover:text-blue-600'} />
                </button>
                <button onClick={() => removeContentBlock(index)}>
                  <Trash2 size={16} className="text-gray-500 hover:text-red-600" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">List Type</label>
                <select
                  value={block.list.type}
                  onChange={(e) => updateContentBlock(index, 'list.type', e.target.value)}
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="unordered">Unordered (bullets)</option>
                  <option value="ordered">Ordered (numbers)</option>
                </select>
              </div><div>
                <label className="block text-sm font-medium text-gray-700 mb-2">List Items</label>
                <div className="space-y-2">
                  {block.list.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateListItem(index, itemIndex, e.target.value)}
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Item ${itemIndex + 1}`}
                      />
                      <button
                        onClick={() => removeListItem(index, itemIndex)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        disabled={block.list.items.length === 1}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => addListItem(index)}
                  className="mt-2 flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Plus size={16} />
                  Add Item
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderPreview = (block) => {
    switch (block.type) {
      case 'text':
        return (
          <div
            key={block.order}
            style={{
              color: block.formatting.color,
              fontSize: block.formatting.fontSize,
              textAlign: block.formatting.alignment,
              fontWeight: block.formatting.bold ? 'bold' : 'normal',
              fontStyle: block.formatting.italic ? 'italic' : 'normal',
              textDecoration: block.formatting.underline ? 'underline' : 'none'
            }}
            className="mb-4"
          >
            {block.text}
          </div>
        );

      case 'image':
        return block.image.url ? (
          <div key={block.order} className={`mb-4 text-${block.image.alignment}`}>
            <img
              src={block.image.url}
              alt={block.image.alt}
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
            {block.image.caption && (
              <p className="text-sm text-gray-600 mt-2 italic">{block.image.caption}</p>
            )}
          </div>
        ) : null;

      case 'youtube':
        return block.youtube.videoId ? (
          <div key={block.order} className="mb-4">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${block.youtube.videoId}?autoplay=${block.youtube.autoplay ? 1 : 0}&controls=${block.youtube.controls ? 1 : 0}&start=${block.youtube.startTime}`}
                title={block.youtube.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
            {block.youtube.title && (
              <p className="text-sm text-gray-600 mt-2">{block.youtube.title}</p>
            )}
          </div>
        ) : null;

      case 'heading':
        const HeadingTag = `h${block.heading.level}`;
        return React.createElement(
          HeadingTag,
          {
            key: block.order,
            className: `mb-4 font-bold ${block.heading.level === 1 ? 'text-3xl' :
              block.heading.level === 2 ? 'text-2xl' :
                block.heading.level === 3 ? 'text-xl' :
                  block.heading.level === 4 ? 'text-lg' :
                    block.heading.level === 5 ? 'text-base' :
                      'text-sm'
              }`
          },
          block.heading.text
        );

      case 'quote':
        return (
          <blockquote key={block.order} className="mb-4 border-l-4 border-blue-500 pl-4 italic">
            <p className="text-gray-700">{block.quote.text}</p>
            {(block.quote.author || block.quote.source) && (
              <footer className="text-sm text-gray-500 mt-2">
                — {block.quote.author}{block.quote.source && `, ${block.quote.source}`}
              </footer>
            )}
          </blockquote>
        );

      case 'list':
        const ListTag = block.list.type === 'ordered' ? 'ol' : 'ul';
        return React.createElement(
          ListTag,
          {
            key: block.order,
            className: `mb-4 ${block.list.type === 'ordered' ? 'list-decimal' : 'list-disc'} list-inside`
          },
          block.list.items.map((item, index) =>
            React.createElement('li', { key: index, className: 'mb-1' }, item)
          )
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {article ? 'Edit Article' : 'Create Article'}
              </h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${previewMode ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  <Eye size={16} />
                  {previewMode ? 'Edit' : 'Preview'}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={form.status}
                onChange={handleChange}
                name="status"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>

              <button
                onClick={onCancel}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={16} />
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
              >
                <Save size={16} />
                Save Article
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!previewMode ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Basic Info */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Article Details</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter article title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={3}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Enter article description"
                    />
                  </div>
                </div>
              </div>

              {/* Content Blocks */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Content</h2>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        {[
                          { type: 'text', icon: Type, label: 'Text' },
                          { type: 'image', icon: Image, label: 'Image' },
                          { type: 'youtube', icon: Video, label: 'Video' },
                          { type: 'heading', icon: Heading, label: 'Heading' },
                          { type: 'quote', icon: Quote, label: 'Quote' },
                          { type: 'list', icon: List, label: 'List' }
                        ].map(({ type, icon: Icon, label }) => (
                          <button
                            key={type}
                            onClick={() => addContentBlock(type)}
                            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-white rounded-md transition-colors"
                            title={`Add ${label}`}
                          >
                            <Icon size={16} />
                            <span className="hidden sm:inline">{label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {form.content.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Type size={48} className="mx-auto mb-4 text-gray-300" />
                      <p className="text-lg mb-2">No content blocks yet</p>
                      <p className="text-sm">Add content blocks using the buttons above</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {form.content.map((block, index) => renderContentBlock(block, index))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Category */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Category</h3>
                </div>
                <div className="p-4">
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="Bac">Bac</option>
                    <option value="Ne">NE</option>
                  </select>
                </div>
              </div>

              {/* Thumbnail */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Cover</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setForm((prev) => ({ ...prev, thumbnailFile: e.target.files[0] }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {form.thumbnailFile && (
                <div className="mt-3">
                  <img
                    src={URL.createObjectURL(form.thumbnailFile)}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Publishing */}
              {form.status === 'scheduled' && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Schedule</h3>
                  </div>
                  <div className="p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date & Time</label>
                    <input
                      type="datetime-local"
                      name="scheduledAt"
                      value={form.scheduledAt}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Preview Mode */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-8">
                {/* Article Header */}
                <div className="mb-8">
                  {form.thumbnail.url && (
                    <div className="mb-6">
                      <img
                        src={form.thumbnail.url}
                        alt={form.thumbnail.alt}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      {form.thumbnail.caption && (
                        <p className="text-sm text-gray-600 mt-2 italic">{form.thumbnail.caption}</p>
                      )}
                    </div>
                  )}

                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{form.title}</h1>
                  <p className="text-lg text-gray-600 mb-4">{form.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {form.category && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md">
                        {form.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose max-w-none">
                  {form.content.map(block => renderPreview(block))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddArticle;