import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Manage.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Manage() {
   const [materials, setMaterials] = useState([
      {
         id: 1,
         maVT: 'VT001',
         maKKS: 'KKS001',
         tenVT: 'Vật tư A',
         donViTinh: 'Cái',
         nhaCungCap: 'Công ty A',
         nguonGoc: 'Việt Nam',
      },
   ]);

   const [formData, setFormData] = useState({
      maVT: '',
      maKKS: '',
      tenVT: '',
      donViTinh: '',
      nhaCungCap: '',
      nguonGoc: '',
   });

   const [isEditing, setIsEditing] = useState(false);
   const [selectedId, setSelectedId] = useState(null);

   const [nhaCungCapOptions, setNhaCungCapOptions] = useState(['Công ty A', 'Công ty B']);
   const [nguonGocOptions, setNguonGocOptions] = useState(['Việt Nam', 'Trung Quốc']);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const handleAdd = () => {
      if (!formData.tenVT || !formData.donViTinh) {
         alert('Tên Vật tư và Đơn vị tính là bắt buộc.');
         return;
      }

      const newId = materials.length ? Math.max(...materials.map((mat) => mat.id)) + 1 : 1;
      const newMaterial = {
         id: newId,
         maVT: formData.maVT.trim() === '' ? `VT${newId.toString().padStart(3, '0')}` : formData.maVT,
         maKKS: formData.maKKS,
         tenVT: formData.tenVT,
         donViTinh: formData.donViTinh,
         nhaCungCap: formData.nhaCungCap,
         nguonGoc: formData.nguonGoc,
      };

      setMaterials([...materials, newMaterial]);
      handleClose();
   };

   const handleSelect = (id) => {
      const material = materials.find((mat) => mat.id === id);
      setFormData(material);
      setSelectedId(id);
      setIsEditing(true);
   };

   const handleEdit = () => {
      if (!formData.tenVT || !formData.donViTinh) {
         alert('Tên Vật tư và Đơn vị tính là bắt buộc.');
         return;
      }

      setMaterials(materials.map((mat) => (mat.id === selectedId ? { ...formData, id: selectedId } : mat)));
      handleClose();
   };

   const handleDelete = () => {
      if (window.confirm('Bạn có chắc chắn muốn xóa vật tư này không?')) {
         setMaterials(materials.filter((mat) => mat.id !== selectedId));
         handleClose();
      }
   };

   const handleClose = () => {
      setFormData({
         maVT: '',
         maKKS: '',
         tenVT: '',
         donViTinh: '',
         nhaCungCap: '',
         nguonGoc: '',
      });
      setIsEditing(false);
      setSelectedId(null);
   };

   const handleNguonGocChange = (e) => {
      const value = e.target.value;
      if (!nguonGocOptions.includes(value) && value) {
         setNguonGocOptions([...nguonGocOptions, value]);
      }
      handleChange(e);
   };

   const handleNhaCungCapChange = (e) => {
      const value = e.target.value;
      if (!nhaCungCapOptions.includes(value) && value) {
         setNhaCungCapOptions([...nhaCungCapOptions, value]);
      }
      handleChange(e);
   };

   return (
      <div className={cx('wrapper')}>
         <div className={cx('left')}>
            <div className={cx('first')}>
               <div className={cx('first__title')}>Thông tin vật tư</div>
               <div className={cx('first__content')}>
                  <div className={cx('first__content__row')}>
                     <div className={cx('first__content__item')}>
                        <label htmlFor="maVT">Mã VT:</label>
                        <input
                           type="text"
                           name="maVT"
                           value={formData.maVT}
                           onChange={handleChange}
                           disabled={isEditing}
                        />
                     </div>
                     <div className={cx('first__content__item')}>
                        <label htmlFor="maKKS">Mã KKS:</label>
                        <input type="text" name="maKKS" value={formData.maKKS} onChange={handleChange} />
                     </div>
                  </div>
                  <div className={cx('first__content__row')}>
                     <div className={cx('first__content__item')}>
                        <label htmlFor="tenVT">Tên Vật tư:</label>
                        <input type="text" name="tenVT" value={formData.tenVT} onChange={handleChange} required />
                     </div>
                     <div className={cx('first__content__item')}>
                        <label htmlFor="donViTinh">ĐV Tính:</label>
                        <input
                           type="text"
                           name="donViTinh"
                           value={formData.donViTinh}
                           onChange={handleChange}
                           required
                        />
                     </div>
                  </div>
                  <div className={cx('first__content__row')}>
                     <div className={cx('first__content__item')}>
                        <label htmlFor="nguonGoc">Nguồn gốc:</label>
                        <select name="nguonGoc" value={formData.nguonGoc} onChange={handleNguonGocChange}>
                           <option value="">Chọn Nguồn gốc</option>
                           {nguonGocOptions.map((option, index) => (
                              <option key={index} value={option}>
                                 {option}
                              </option>
                           ))}
                        </select>
                     </div>
                     <div className={cx('first__content__item')}>
                        <label htmlFor="nhaCungCap">Nhà cung cấp:</label>
                        <select name="nhaCungCap" value={formData.nhaCungCap} onChange={handleNhaCungCapChange}>
                           <option value="">Chọn Nhà cung cấp</option>
                           {nhaCungCapOptions.map((option, index) => (
                              <option key={index} value={option}>
                                 {option}
                              </option>
                           ))}
                        </select>
                     </div>
                  </div>
               </div>
            </div>
            <div className={cx('second')}>
               <div className={cx('second__title')}>Danh sách vật tư</div>
               <div className={cx('second__content')}>
                  <table className={cx('table')}>
                     <thead>
                        <tr>
                           <th>STT</th>
                           <th>Mã VT</th>
                           <th>Mã KKS</th>
                           <th>Tên VT</th>
                           <th>Đơn vị tính</th>
                           <th>Nhà cung cấp</th>
                           <th>Nguồn gốc</th>
                        </tr>
                     </thead>
                     <tbody>
                        {materials.map((material, index) => (
                           <tr
                              key={material.id}
                              onClick={() => handleSelect(material.id)}
                              style={{
                                 cursor: 'pointer',
                                 backgroundColor: selectedId === material.id ? '#f0f0f0' : 'transparent',
                              }}
                           >
                              <td>{index + 1}</td>
                              <td>{material.maVT}</td>
                              <td>{material.maKKS}</td>
                              <td>{material.tenVT}</td>
                              <td>{material.donViTinh}</td>
                              <td>{material.nhaCungCap}</td>
                              <td>{material.nguonGoc}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
         <div className={cx('right')}>
            <button className={cx('right__button')} onClick={handleAdd}>
               Thêm
            </button>
            <button className={cx('right__button')} onClick={handleEdit} disabled={!isEditing}>
               Sửa
            </button>
            <button className={cx('right__button')} onClick={handleDelete} disabled={!selectedId}>
               Xóa
            </button>
            <Link to="/" style={{ textDecoration: 'none' }}>
               <button className={cx('right__button')}> Đóng</button>
            </Link>
         </div>
      </div>
   );
}

export default Manage;
