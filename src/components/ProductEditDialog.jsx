// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Plus, Trash2, Upload } from 'lucide-react';
// @ts-ignore;
import { Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Badge, Button, Switch } from '@/components/ui';

export function ProductEditDialog({
  product,
  onSave,
  onClose
}) {
  const [editedProduct, setEditedProduct] = useState(product || {
    name: '',
    latin: '',
    efficacy: [],
    part: '',
    origin: '',
    moq: 1,
    priceRange: '',
    grade: '',
    stock: 0,
    description: '',
    images: [],
    certificates: [],
    isActive: true
  });
  const efficacyOptions = ['补气', '养血', '清热', '解毒', '活血', '安神', '滋阴', '壮阳'];
  const partOptions = ['根', '茎', '叶', '花', '果实', '种子', '皮', '全草'];
  const originOptions = ['中国', '韩国', '日本', '印度', '越南', '泰国', '美国', '加拿大'];
  const gradeOptions = ['特级', '一级', '二级', '三级', '出口级', '有机认证'];
  const handleSave = () => {
    onSave(editedProduct);
    onClose();
  };
  const handleImageUpload = e => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setEditedProduct(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };
  const handleCertificateUpload = e => {
    const files = Array.from(e.target.files);
    const newCertificates = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type
    }));
    setEditedProduct(prev => ({
      ...prev,
      certificates: [...prev.certificates, ...newCertificates]
    }));
  };
  return <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? '编辑产品' : '添加产品'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">产品名称 *</label>
              <Input value={editedProduct.name} onChange={e => setEditedProduct(prev => ({
              ...prev,
              name: e.target.value
            }))} placeholder="如：长白山野山参" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">拉丁学名 *</label>
              <Input value={editedProduct.latin} onChange={e => setEditedProduct(prev => ({
              ...prev,
              latin: e.target.value
            }))} placeholder="如：Panax ginseng C.A. Mey" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">产地 *</label>
              <Select value={editedProduct.origin} onValueChange={value => setEditedProduct(prev => ({
              ...prev,
              origin: value
            }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {originOptions.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">药材部位 *</label>
              <Select value={editedProduct.part} onValueChange={value => setEditedProduct(prev => ({
              ...prev,
              part: value
            }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {partOptions.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">功效 *</label>
            <div className="flex flex-wrap gap-2">
              {efficacyOptions.map(option => <Badge key={option} variant={editedProduct.efficacy?.includes(option) ? 'default' : 'outline'} className={`cursor-pointer ${editedProduct.efficacy?.includes(option) ? 'bg-green-700' : ''}`} onClick={() => {
              const newEfficacy = editedProduct.efficacy?.includes(option) ? editedProduct.efficacy.filter(e => e !== option) : [...(editedProduct.efficacy || []), option];
              setEditedProduct(prev => ({
                ...prev,
                efficacy: newEfficacy
              }));
            }}>
                  {option}
                </Badge>)}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">等级 *</label>
              <Select value={editedProduct.grade} onValueChange={value => setEditedProduct(prev => ({
              ...prev,
              grade: value
            }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {gradeOptions.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">起订量 (kg)</label>
              <Input type="number" value={editedProduct.moq} onChange={e => setEditedProduct(prev => ({
              ...prev,
              moq: parseFloat(e.target.value) || 0
            }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">库存</label>
              <Input type="number" value={editedProduct.stock} onChange={e => setEditedProduct(prev => ({
              ...prev,
              stock: parseInt(e.target.value) || 0
            }))} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">价格区间</label>
            <Input value={editedProduct.priceRange} onChange={e => setEditedProduct(prev => ({
            ...prev,
            priceRange: e.target.value
          }))} placeholder="如：¥288-580/kg" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">功效描述</label>
            <Textarea value={editedProduct.description} onChange={e => setEditedProduct(prev => ({
            ...prev,
            description: e.target.value
          }))} rows={3} placeholder="详细描述产品功效和特点" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">产品图片</label>
            <div className="space-y-2">
              {editedProduct.images?.map((img, index) => <div key={index} className="flex items-center space-x-2">
                  <Input value={img} onChange={e => {
                const newImages = [...editedProduct.images];
                newImages[index] = e.target.value;
                setEditedProduct(prev => ({
                  ...prev,
                  images: newImages
                }));
              }} placeholder="图片URL" />
                  <Button variant="ghost" size="sm" onClick={() => {
                const newImages = editedProduct.images.filter((_, i) => i !== index);
                setEditedProduct(prev => ({
                  ...prev,
                  images: newImages
                }));
              }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>)}
              <div className="flex items-center space-x-2">
                <Input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                <Button variant="outline" size="sm" onClick={() => document.getElementById('image-upload').click()}>
                  <Upload className="h-4 w-4 mr-1" />
                  上传图片
                </Button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">证书文件</label>
            <div className="space-y-2">
              {editedProduct.certificates?.map((cert, index) => <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">{cert.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => {
                const newCertificates = editedProduct.certificates.filter((_, i) => i !== index);
                setEditedProduct(prev => ({
                  ...prev,
                  certificates: newCertificates
                }));
              }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>)}
              <Input type="file" multiple onChange={handleCertificateUpload} className="hidden" id="certificate-upload" />
              <Button variant="outline" size="sm" onClick={() => document.getElementById('certificate-upload').click()}>
                <Upload className="h-4 w-4 mr-1" />
                上传证书
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch checked={editedProduct.isActive} onCheckedChange={checked => setEditedProduct(prev => ({
            ...prev,
            isActive: checked
          }))} />
            <label className="text-sm font-medium">上架状态</label>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>取消</Button>
          <Button onClick={handleSave}>保存</Button>
        </div>
      </DialogContent>
    </Dialog>;
}