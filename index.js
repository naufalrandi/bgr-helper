var fs = require('fs');
module.exports = {
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    },
    base64(data, loc,prefix='bageur'){
        const file = data.split(";base64,")
        const exten = file[0].split(':')
        const ext = exten[1].split('/')[1]
        const path = 'public/images/'+loc+'/';

        fs.mkdirSync(path, { recursive: true })

        const filename = prefix + Math.floor(Math.random() * 10000)+'-'+Date.now() + '.' + ext;

        fs.writeFileSync(path + filename, file[1], { encoding: 'base64' });

        const res = {}
        res.up = filename
        res.path = path
        console.log(res)
        return res
    },
    slug (str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
      
        var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to   = "aaaaeeeeiiiioooouuuunc------";
        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
    
        str = str.replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    
        return str;
    },
    getPagingData (data, page, limit){
        const { count: totalItems, rows: datas } = data;
        const currentPage = page ? +page : 1;
        const totalPages = Math.ceil(totalItems / limit);
        console.log(limit)
        return { totalItems, datas, totalPages, currentPage };
    },
    getPagination(page, size) {
        const limit = size ? +size : 12;
        const offset = page ? page * limit : 0;
        return { limit, offset };
    }
}
