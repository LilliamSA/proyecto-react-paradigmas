import http from "../http-common";

const getAll = () => {
  return http.get("/materia");
};

const get = (id) => {
  return http.get(`/materia/${id}`);
};

const create = (data) => {
  return http.post("/materia", data);
};
const edit = (id) => {
  return http.get(`/materia/${id}`);
};

const update = (id, data) => {
  return http.put(`/materia/${id}`, data);
};

const deleteAll = () => {
  return http.delete(`/materia`);
};

const findByTitle = (title) => {
  return http.get(`/materia?title=${title}`);
};

const findAllByPeriodoId = (idPeriodo) => {
  return http.get(`/materia/periodo/${idPeriodo}`);
};

const findCuposById = (id) => {
  return http.get(`/materia/cupos/${id}`);
};

const findById = (id) => {
  return http.get(`/materia?id=${id}`);
};

const deleteMateria = (id) => {
  return http.delete(`/materia/verificar/${id}`);
};

const MateriaService = {
  getAll,
  get,
  create,
  edit,
  update,
  deleteAll,
  findByTitle,
  findAllByPeriodoId,
  findCuposById,
  findById,
  deleteMateria,
};

export default MateriaService;
