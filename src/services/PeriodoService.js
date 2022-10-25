import http from "../http-common";

const getAll = () => {
  return http.get("/periodo");
};

const get = (id) => {
  return http.get(`/periodo/${id}`);
};

const create = (data) => {
  return http.post("/periodo", data);
};

const edit = (id) => {
  return http.get(`/periodo?id=${id}`);
};

const update = (id, data) => {
  return http.put(`/periodo/${id}`, data);
};

const deleteAll = () => {
  return http.delete(`/periodo`);
};

const findByTitle = (title) => {
  return http.get(`/periodo?title=${title}`);
};

const findById = (id) => {
  return http.get(`/periodo/${id}`);
};

const deletePeriodo = (id) => {
  return http.delete(`/periodo/verificar/${id}`);
};

const PeriodoService = {
  getAll,
  get,
  create,
  edit,
  update,
  deleteAll,
  findByTitle,
  findById,
  deletePeriodo,
};

export default PeriodoService;
