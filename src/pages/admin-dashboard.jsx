// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Settings, Eye, EyeOff, Save, RotateCcw, Plus, Trash2, GripVertical, Upload, Image as ImageIcon } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle, Switch, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Input, Textarea, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Alert, AlertDescription } from '@/components/ui';

// 拖拽排序组件
function DraggableModule({
  module,
  index,
  moveModule,
  onEdit
}) {
  const [isDragging, setIsDragging] = useState(false);
  const handleDragStart = e => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('index', index.toString());
    setIsDragging(true);
  };
  const handleDragEnd = () => {
    setIsDragging(false);
  };
  const handleDragOver = e => {
    e.preventDefault();
  };
  const handleDrop = e => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('index'));
    const hoverIndex = index;
    if (dragIndex !== hoverIndex) {
      moveModule(dragIndex, hoverIndex);
    }
  };
  return <div className={`p-4 bg-white rounded-lg shadow-sm border-2 ${isDragging ? 'border-green-500 opacity-50' : 'border-gray-200'} cursor-move`} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDrop={handleDrop}>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <GripVertical className="h-5 w-5 text-gray-400" />
        <div>
          <h4 className="font-medium text-gray-900">{module.title}</h4>
          <p className="text-sm text-gray-600">{module.type}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Switch checked={module.visible} onCheckedChange={checked => onEdit(index, {
          ...module,
          visible: checked
        })} />
        <Button variant="ghost" size="sm" onClick={() => onEdit(index, module)}>
          编辑
        </Button>
      </div>
    </div>
  </div>;
}

// 模块编辑对话框
function ModuleEditDialog({
  module,
  onSave,
  onClose
}) {
  const [editedModule, setEditedModule] = useState(module);
  const handleSave = () => {
    onSave(editedModule);
    onClose();
  };
  return <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>编辑模块</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">模块标题</label>
            <Input value={editedModule.title} onChange={e => setEditedModule(prev => ({
            ...prev,
            title: e.target.value
          }))} />
          </div>
          
          {editedModule.type === 'carousel' && <div>
              <label className="block text-sm font-medium mb-2">轮播图片</label>
              <div className="space-y-2">
                {editedModule.images?.map((img, index) => <div key={index} className="flex items-center space-x-2">
                    <Input placeholder="图片URL" value={img.url} onChange={e => {
                const newImages = [...editedModule.images];
                newImages[index].url = e.target.value;
                setEditedModule(prev => ({
                  ...prev,
                  images: newImages
                }));
              }} />
                    <Input placeholder="标题" value={img.title} onChange={e => {
                const newImages = [...editedModule.images];
                newImages[index].title = e.target.value;
                setEditedModule(prev => ({
                  ...prev,
                  images: newImages
                }));
              }} />
                    <Button variant="ghost" size="sm" onClick={() => {
                const newImages = editedModule.images.filter((_, i) => i !== index);
                setEditedModule(prev => ({
                  ...prev,
                  images: newImages
                }));
              }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>)}
                <Button variant="outline" size="sm" onClick={() => {
              setEditedModule(prev => ({
                ...prev,
                images: [...(prev.images || []), {
                  url: '',
                  title: ''
                }]
              }));
            }}>
                  <Plus className="h-4 w-4 mr-1" />
                  添加图片
                </Button>
              </div>
            </div>}

          {editedModule.type === 'categories' && <div>
              <label className="block text-sm font-medium mb-2">推荐分类</label>
              <div className="space-y-2">
                {editedModule.categories?.map((cat, index) => <div key={index} className="flex items-center space-x-2">
                    <Input placeholder="分类名称" value={cat.name} onChange={e => {
                const newCategories = [...editedModule.categories];
                newCategories[index].name = e.target.value;
                setEditedModule(prev => ({
                  ...prev,
                  categories: newCategories
                }));
              }} />
                    <Input placeholder="图片URL" value={cat.image} onChange={e => {
                const newCategories = [...editedModule.categories];
                newCategories[index].image = e.target.value;
                setEditedModule(prev => ({
                  ...prev,
                  categories: newCategories
                }));
              }} />
                    <Button variant="ghost" size="sm" onClick={() => {
                const newCategories = editedModule.categories.filter((_, i) => i !== index);
                setEditedModule(prev => ({
                  ...prev,
                  categories: newCategories
                }));
              }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>)}
                <Button variant="outline" size="sm" onClick={() => {
              setEditedModule(prev => ({
                ...prev,
                categories: [...(prev.categories || []), {
                  name: '',
                  image: ''
                }]
              }));
            }}>
                  <Plus className="h-4 w-4 mr-1" />
                  添加分类
                </Button>
              </div>
            </div>}

          {editedModule.type === 'products' && <div>
              <label className="block text-sm font-medium mb-2">热门产品</label>
              <Input type="number" placeholder="显示产品数量" value={editedModule.count || 6} onChange={e => setEditedModule(prev => ({
            ...prev,
            count: parseInt(e.target.value) || 6
          }))} />
            </div>}
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>取消</Button>
          <Button onClick={handleSave}>保存</Button>
        </div>
      </DialogContent>
    </Dialog>;
}

// 主页面组件
export default function AdminDashboardPage(props) {
  const [modules, setModules] = useState([{
    id: 1,
    type: 'carousel',
    title: '首页轮播图',
    visible: true,
    images: [{
      url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=1920&h=600&fit=crop',
      title: '千年传承 道地药材'
    }, {
      url: 'https://images.unsplash.com/photo-1595242000808-2b0d9b22931e?w=1920&h=600&fit=crop',
      title: '岷县当归 出口级品质'
    }, {
      url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1920&h=600&fit=crop',
      title: '黄芪精品 补气之王'
    }]
  }, {
    id: 2,
    type: 'categories',
    title: '推荐分类',
    visible: true,
    categories: [{
      name: '人参系列',
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop'
    }, {
      name: '当归系列',
      image: 'https://images.unsplash.com/photo-1595242000808-2b0d9b22931e?w=300&h=300&fit=crop'
    }, {
      name: '黄芪系列',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&h=300&fit=crop'
    }, {
      name: '枸杞系列',
      image: 'https://images.unsplash.com/photo-1586810160470-2d3cd0f7934b?w=300&h=300&fit=crop'
    }]
  }, {
    id: 3,
    type: 'products',
    title: '热门产品',
    visible: true,
    count: 6
  }]);
  const [editingModule, setEditingModule] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // 模拟保存到本地存储
  useEffect(() => {
    const saved = localStorage.getItem('tcm-homepage-config');
    if (saved) {
      setModules(JSON.parse(saved));
    }
  }, []);
  const saveToLocalStorage = newModules => {
    localStorage.setItem('tcm-homepage-config', JSON.stringify(newModules));
    setSaveStatus('已保存到本地存储');
    setTimeout(() => setSaveStatus(''), 2000);
  };
  const moveModule = (dragIndex, hoverIndex) => {
    const newModules = [...modules];
    const draggedModule = newModules[dragIndex];
    newModules.splice(dragIndex, 1);
    newModules.splice(hoverIndex, 0, draggedModule);
    setModules(newModules);
    saveToLocalStorage(newModules);
  };
  const updateModule = (index, updatedModule) => {
    const newModules = [...modules];
    newModules[index] = updatedModule;
    setModules(newModules);
    saveToLocalStorage(newModules);
  };
  const resetToDefault = () => {
    const defaultModules = [{
      id: 1,
      type: 'carousel',
      title: '首页轮播图',
      visible: true,
      images: [{
        url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=1920&h=600&fit=crop',
        title: '千年传承 道地药材'
      }, {
        url: 'https://images.unsplash.com/photo-1595242000808-2b0d9b22931e?w=1920&h=600&fit=crop',
        title: '岷县当归 出口级品质'
      }, {
        url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1920&h=600&fit=crop',
        title: '黄芪精品 补气之王'
      }]
    }, {
      id: 2,
      type: 'categories',
      title: '推荐分类',
      visible: true,
      categories: [{
        name: '人参系列',
        image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop'
      }, {
        name: '当归系列',
        image: 'https://images.unsplash.com/photo-1595242000808-2b0d9b22931e?w=300&h=300&fit=crop'
      }, {
        name: '黄芪系列',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&h=300&fit=crop'
      }, {
        name: '枸杞系列',
        image: 'https://images.unsplash.com/photo-1586810160470-2d3cd0f7934b?w=300&h=300&fit=crop'
      }]
    }, {
      id: 3,
      type: 'products',
      title: '热门产品',
      visible: true,
      count: 6
    }];
    setModules(defaultModules);
    saveToLocalStorage(defaultModules);
  };
  return <div style={props.style} className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-green-800">中药材后台管理</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => setPreviewMode(!previewMode)}>
                {previewMode ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                {previewMode ? '退出预览' : '预览效果'}
              </Button>
              <Button variant="outline" size="sm" onClick={resetToDefault}>
                <RotateCcw className="h-4 w-4 mr-1" />
                重置默认
              </Button>
              <Button onClick={() => saveToLocalStorage(modules)}>
                <Save className="h-4 w-4 mr-1" />
                保存配置
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Save Status */}
      {saveStatus && <Alert className="mx-auto max-w-7xl mt-4">
          <AlertDescription>{saveStatus}</AlertDescription>
        </Alert>}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {previewMode ?
      // 预览模式
      <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">首页预览</h2>
            <div className="space-y-8">
              {modules.filter(m => m.visible).map((module, index) => <div key={module.id} className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">{module.title}</h3>
                  <div className="text-sm text-gray-600">
                    {module.type === 'carousel' && `轮播图: ${module.images?.length || 0} 张图片`}
                    {module.type === 'categories' && `分类: ${module.categories?.length || 0} 个`}
                    {module.type === 'products' && `产品: ${module.count || 6} 个`}
                  </div>
                </div>)}
            </div>
          </div> :
      // 编辑模式
      <div>
            <h2 className="text-lg font-semibold mb-4">首页模块配置</h2>
            <p className="text-gray-600 mb-6">拖拽模块调整顺序，点击编辑按钮修改内容</p>
            
            <div className="space-y-4">
              {modules.map((module, index) => <DraggableModule key={module.id} module={module} index={index} moveModule={moveModule} onEdit={(idx, updatedModule) => {
            if (typeof updatedModule === 'object' && updatedModule.id) {
              setEditingModule(updatedModule);
            } else {
              updateModule(idx, updatedModule);
            }
          }} />)}
            </div>
          </div>}
      </main>

      {/* Edit Dialog */}
      {editingModule && <ModuleEditDialog module={editingModule} onSave={updatedModule => {
      const index = modules.findIndex(m => m.id === updatedModule.id);
      updateModule(index, updatedModule);
      setEditingModule(null);
    }} onClose={() => setEditingModule(null)} />}
    </div>;
}