const collection = require("../models/contas");

module.exports = (app, dbConnection) => {

    app.get('/_bd', async (req, res) => {
        try {
            let { query: obj } = req;
            let collection;
            let populate = '';
            let page = 1;
            let limit = 3500;
            let sort = '_id';
            let findReg = { $and: [] };

            // Configuração inicial do modelo e parâmetros básicos
            for (const [index, key] of Object.keys(obj).entries()) {
                const value = obj[key];

                console.log(key)

                if (key === 'versao') {

                    // Logica de validação de versão
                    return res.status(200).json([]);

                } else if (index === 0) {

                    collection = require(`../models/${value}`);

                } else {
 
                    // Verificação dos parâmetros de paginação, limite e populates
                    if (key === 'page') {
                        page = parseInt(value);
                    } else if (key === 'limit') {
                        limit = parseInt(value);
                    } else if (key === 'pop') {
                        populate = value;
                    } else if (key === 'sort') {
                        sort = { [value]: -1 };
                    } else {
                        setFindConditions(key, value, findReg);
                    }
                }
            }

            // Consulta ao banco de dados com as condições configuradas
            const regFind = await collection.find(findReg)
                .populate(populate)
                .skip((page - 1) * limit)
                .limit(limit)
                .sort(sort);

            res.status(200).json(regFind);
        } catch (error) {
            res.status(400).json([{ error: error.message }]);
        }
    });

    app.patch('/_bd/:collection', async (req, res) => {

        const collection = require('../models/' + req.params.collection);

        res.header("Access-Control-Allow-Origin", "*");
    
        try {
            const documento = await collection.findOneAndUpdate(
                { _id: req.body._id },
                req.body,
                { upsert: true, new: true }
            );
            console.log(documento);
            return res.status(200).send(documento);
        } catch (err) {
            console.log(err)
            return res.status(400).send([{ error: err }]);
        }
    });
    

    // Função para gerar expressão regular com sensibilidade a diacríticos
    function diacriticSensitiveRegex(string = '') {
        return string
            .replace(/a/g, '[a,á,à,ä,â]')
            .replace(/A/g, '[A,a,á,à,ä,â]')
            .replace(/e/g, '[e,é,ë,è]')
            .replace(/E/g, '[E,e,é,ë,è]')
            .replace(/i/g, '[i,í,ï,ì]')
            .replace(/I/g, '[I,i,í,ï,ì]')
            .replace(/o/g, '[o,ó,ö,ò]')
            .replace(/O/g, '[O,o,ó,ö,ò]')
            .replace(/u/g, '[u,ü,ú,ù]')
            .replace(/U/g, '[U,u,ü,ú,ù]');
    }

    // Função para configurar os parâmetros de busca
    function setFindConditions(key, value, findReg) {
        if (key.includes('*in')) {
            const _key = key.replace('*in', '');
            const _obj = JSON.parse(value);
            findReg.$and.push({ [_key]: { $in: _obj } });
        } else if (value.includes('*dtP')) {
            const [start, end] = value.replace('*dtP', '').split('|');
            findReg.$and.push({
                [key]: {
                    $gte: moment(start, 'YYYY-MM-DD').startOf('day').toDate(),
                    $lte: moment(end, 'YYYY-MM-DD').endOf('day').toDate()
                }
            });
        } else if (value.includes('*dt')) {
            const date = new Date(value.replace('*dt', ''));
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);
            findReg.$and.push({
                [key]: { $gte: startDate, $lt: endDate }
            });
        } else if (!value.includes('*')) {
            findReg.$and.push({ [key]: value === 'null' ? null : value });
        } else {
            const regex = new RegExp(diacriticSensitiveRegex(value.replace('*', '')), 'i');
            findReg.$and.push({ [key]: regex });
        }
    }
}