import axios from 'axios';

export const config = {
     baseUrl: 'http://localhost',
     port: '4000',
     uploads: 'uploads'
}

// articles 操作
export const getArticleList = (params) => {
  return axios.post(`${config.baseUrl}:${config.port}/lists`, {
    ...params
  });
};

export const getArticleById = (params) => {
  return axios.get(`${config.baseUrl}:${config.port}/list/${params.id}`);
}

export const getArticleByType = (params) => {
  return axios.post(`${config.baseUrl}:${config.port}/lists/type`, {
    ...params
  });
}

export const addArticle = (params) => {
  return axios.post(`${config.baseUrl}:${config.port}/admin/article/add`, {
    ...params
  });
}

export const updateArticle = (params) => {
  return axios.post(`${config.baseUrl}:${config.port}/admin/article/update`, {
    ...params
  });
}

export const deleteArticleById = (params) => {
  return axios.get(`${config.baseUrl}:${config.port}/admin/article/delete/${params.id}`);
}

// labels操作
export const getAllLabels = () => {
  return axios.get(`${config.baseUrl}:${config.port}/admin/labels`);
}

export const getLabelById = (params) => {
  return axios.get(`${config.baseUrl}:${config.port}/admin/label/${params.id}`);
}

export const addLabel = (params) => {
  return axios.post(`${config.baseUrl}:${config.port}/admin/labels/add`, {
    ...params
  });
}

export const updateLabel = (params) => {
  return axios.post(`${config.baseUrl}:${config.port}/admin/labels/update`, {
    ...params
  });
}

export const deleteLabelById = (params) => {
  return axios.get(`${config.baseUrl}:${config.port}/admin/labels/delete/${params.id}`);
}


//  user 操作
export const getAllUsers = () => {
  return axios.get(`${config.baseUrl}:${config.port}/admin/users`);
}

export const getUserById = (params) => {
  return axios.get(`${config.baseUrl}:${config.port}/admin/user/${params.id}`);
}

export const addUser = (params) => {
  return axios.post(`${config.baseUrl}:${config.port}/admin/users/add`, {
    ...params
  });
}

export const updateUser = (params) => {
  return axios.post(`${config.baseUrl}:${config.port}/admin/users/update`, {
    ...params
  });
}

export const deleteUserById = (params) => {
  return axios.get(`${config.baseUrl}:${config.port}/admin/users/delete/${params.id}`);
}

// banner 操作

export const getBannerList = (params) => {
  return axios.post(`${config.baseUrl}:${config.port}/banners/lists`, {
    ...params
  });
}

export const getBannerByLimit = (params) => {
  return axios.post(`${config.baseUrl}:${config.port}/banners`,{
    ...params
  });
}

export const getBannerById = (params) => {
  return axios.get(`${config.baseUrl}:${config.port}/banners/one/${params.id}`);
}

export const addBanner = (params) => {
  return axios.post(`${config.baseUrl}:${config.port}/banner/add`, {
    ...params
  });
}

export const updateBanner = (params) => {
  return axios.post(`${config.baseUrl}:${config.port}/banner/update`, {
    ...params
  });
}

export const deleteBannerById = (params) => {
  return axios.get(`${config.baseUrl}:${config.port}/banner/delete/${params.id}`);
}

// 图片上传
export const uploads = (params) => {
  return axios.post(`${config.baseUrl}:${config.port}/uploads`, {
    ...params
  });
}