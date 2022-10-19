import http from '../http-common';

class LogService {
    getAll() {
        return http.get('/log');
    }
    
}

export default new LogService();

