import React, { useState, useMemo, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Header from '../components/Header';

const NewTicket = () => {
    const navigate = useNavigate();
    const quillRef = useRef(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [coordinates, setCoordinates] = useState({ x: '', y: '', z: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [createdTicketId, setCreatedTicketId] = useState(null);
    const [errors, setErrors] = useState({});

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);

        if (value.length > 24) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                title: '标题不能超过25个字符',
            }));
        } else {
            setErrors((prevErrors) => {
                const { title, ...otherErrors } = prevErrors;
                return otherErrors;
            });
        }
    };

    const handleSubmit = async () => {
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = '标题不能为空';
        } else if (title.length > 24) {
            newErrors.title = '标题不能超过25个字符';
        }

        if (!description.trim()) {
            newErrors.description = '描述不能为空';
        }

        if (!category) {
            newErrors.category = '请选择类别';
        }

        if (category === '优化建议' && !subCategory) {
            newErrors.subCategory = '请选择具体类别';
        }

        if (category === '问题反馈') {
            if (coordinates.x && isNaN(coordinates.x)) {
                newErrors.coordinatesX = 'X坐标必须是数字';
            }
            if (coordinates.y && isNaN(coordinates.y)) {
                newErrors.coordinatesY = 'Y坐标必须是数字';
            }
            if (coordinates.z && isNaN(coordinates.z)) {
                newErrors.coordinatesZ = 'Z坐标必须是数字';
            }
        }

        setErrors(newErrors);

        // 如果有任何错误，阻止提交
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post('https://www.xfkenzify.com:5000/tickets', {
                title,
                description,
                category,
                subCategory: category === '优化建议' ? subCategory : null,
                coordinates: category === '问题反馈' ? coordinates : null,
                createdAt: new Date(),
            });

            setCreatedTicketId(response.data._id); // 存储新创建工单的ID
            setShowSuccessMessage(true);
        } catch (error) {
            console.error('创建工单时出错:', error);
            setIsSubmitting(false);
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        if (e.target.value !== '优化建议') {
            setSubCategory('');
        }
    };

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axios.post('https://www.xfkenzify.com:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const imageUrl = res.data.url;
            const range = quillRef.current.getEditor().getSelection();
            quillRef.current.getEditor().insertEmbed(range.index, 'image', imageUrl);
        } catch (error) {
            console.error('上传图片时出错:', error);
        }
    };

    const handleCopyLink = () => {
        const ticketLink = `${window.location.origin}/tickets/${createdTicketId}`;
        navigator.clipboard.writeText(ticketLink)
            .then(() => {
                alert('链接已复制到剪贴板');
            })
            .catch((error) => {
                console.error('复制链接时出错:', error);
            });
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': '1' }, { 'header': '2' }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                image: () => {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.click();
                    input.onchange = () => {
                        const file = input.files[0];
                        if (file) {
                            handleImageUpload(file);
                        }
                    };
                },
            },
        },
    }), []);

    return (
        <div style={styles.container}>
            <Header />
            <div style={styles.newTicket}>
                <h2>创建新工单</h2>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="标题"
                    style={{ ...styles.input, borderColor: errors.title ? 'red' : '#ccc' }}
                />
                {errors.title && <p style={styles.errorText}>{errors.title}</p>}
                <select
                    value={category}
                    onChange={handleCategoryChange}
                    style={{ ...styles.select, borderColor: errors.category ? 'red' : '#ccc' }}
                >
                    <option value="">请选择类别</option>
                    <option value="问题反馈">问题反馈</option>
                    <option value="优化建议">优化建议</option>
                    <option value="答疑咨询">答疑咨询</option>
                    <option value="其他内容">其他内容</option>
                </select>
                {errors.category && <p style={styles.errorText}>{errors.category}</p>}

                {category === '优化建议' && (
                    <>
                        <div>
                            <p style={styles.coordinateIntro}>对于地图内已经存在的影响使用或观感的问题建议您发表至问题反馈版块，可更加精准的解决问题。</p>
                        </div>
                        <select
                            value={subCategory}
                            onChange={(e) => setSubCategory(e.target.value)}
                            style={{ ...styles.select, borderColor: errors.subCategory ? 'red' : '#ccc' }}
                        >
                            <option value="">请选择具体类别</option>
                            <option value="现有轨道交通/城市优化建议">现有轨道交通/城市优化建议</option>
                            <option value="国赛商务区未来建设">国赛商务区未来规划建议</option>
                            <option value="轨道交通未来规划">轨道交通未来规划建议</option>
                            <option value="城市建筑设施添加建议">城市建筑设施添加建议</option>
                            <option value="工单系统优化建议">工单系统优化建议</option>
                            <option value="枫城宣传素材图相关建议">枫城宣传素材图相关建议</option>
                            <option value="其他类型建议">其他类型建议</option>
                        </select>
                        {errors.subCategory && <p style={styles.errorText}>{errors.subCategory}</p>}
                    </>
                )}

                {category === '答疑咨询' && (
                    <div>
                        <p style={styles.coordinateIntro}>本版块不受理对于城市现有设施、内容的相关咨询，仅受理对于城市未来规划的疑问咨询。欢迎到作者b站动态了解更多信息。</p>
                    </div>
                )}

                {category === '问题反馈' && (
                    <div>
                        <p style={styles.coordinateIntro}>请尽量填写问题的所在坐标，可在设置中打开“显示坐标”查看。若不涉及具体坐标可不填写本项。</p>
                        <input
                            type="text"
                            value={coordinates.x}
                            onChange={(e) => setCoordinates({ ...coordinates, x: e.target.value })}
                            placeholder="X坐标"
                            style={{ ...styles.input, borderColor: errors.coordinatesX ? 'red' : '#ccc' }}
                        />
                        {errors.coordinatesX && <p style={styles.errorText}>{errors.coordinatesX}</p>}
                        <input
                            type="text"
                            value={coordinates.y}
                            onChange={(e) => setCoordinates({ ...coordinates, y: e.target.value })}
                            placeholder="Y坐标"
                            style={{ ...styles.input, borderColor: errors.coordinatesY ? 'red' : '#ccc' }}
                        />
                        {errors.coordinatesY && <p style={styles.errorText}>{errors.coordinatesY}</p>}
                        <input
                            type="text"
                            value={coordinates.z}
                            onChange={(e) => setCoordinates({ ...coordinates, z: e.target.value })}
                            placeholder="Z坐标"
                            style={{ ...styles.input, borderColor: errors.coordinatesZ ? 'red' : '#ccc' }}
                        />
                        {errors.coordinatesZ && <p style={styles.errorText}>{errors.coordinatesZ}</p>}
                    </div>
                )}
                <ReactQuill 
                    ref={quillRef} 
                    value={description} 
                    onChange={setDescription} 
                    modules={modules} 
                    placeholder="请在此键入详细内容" 
                    style={{ ...styles.quillEditor, borderColor: errors.description ? 'red' : '#ccc' }} 
                />
                {errors.description && <p style={styles.errorText}>{errors.description}</p>}

                <button 
                    onClick={handleSubmit} 
                    style={{ ...styles.submitButton, opacity: isSubmitting ? 0.6 : 1 }} 
                    disabled={isSubmitting}
                >
                    {isSubmitting ? '提交中...' : '提交'}
                </button>
                {showSuccessMessage && (
                    <div style={styles.successMessageContainer}>
                        <div style={styles.successMessage}>
                            工单创建成功！您可选择保存工单链接以便后续查看。
                        </div>
                        <div style={styles.buttonContainer}>
                            <button 
                                onClick={() => navigate('/')} 
                                style={styles.redirectButton}
                            >
                                返回主页
                            </button>
                            <button 
                                onClick={handleCopyLink} 
                                style={styles.copyButton}
                            >
                                复制工单链接
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#ffffff',
        color: '#000000',
        minHeight: '100vh',
        paddingTop: '60px',
    },
    newTicket: {
        maxWidth: '800px',
        margin: '20px auto',
        padding: '20px',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    select: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    coordinateIntro: {
        margin: '10px 0',
        fontSize: '16px',
        color: '#333',
    },
    quillEditor: {
        backgroundColor: '#f9f9f9',
        color: '#000000',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    submitButton: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#6200ee',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'opacity 0.3s ease',
    },
    successMessageContainer: {
        marginTop: '20px',
        padding: '10px',
        textAlign: 'center',
    },
    successMessage: {
        padding: '10px',
        backgroundColor: '#4caf50',
        color: '#fff',
        borderRadius: '4px',
        marginBottom: '20px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
    },
    redirectButton: {
        padding: '10px 20px',
        backgroundColor: '#6200ee',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    copyButton: {
        padding: '10px 20px',
        backgroundColor: '#6200ee',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    errorText: {
        color: 'red',
        fontSize: '14px',
        marginTop: '-8px',
        marginBottom: '10px',
    }
};

export default NewTicket;
