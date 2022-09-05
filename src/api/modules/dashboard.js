import request from '../index';

export const dashApi = {
   
    getPanelTotal() {
        return request.get('/student/stat/panel_total', {}, 'yq');
    },
    

}