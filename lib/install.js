const Promise = require('bluebird');
var sentences = require('./sentences.js');


module.exports = function install(){
    // Create parameters
    var param1 = {
        name: 'GLADYS_EMOTIONS',
        value: 'joyful'
    };

    //on prends la langue du 1er admin
    return gladys.utils.sql('select language from user where role=\'admin\' order by id').then(function(lang){
        //then we check if the parameters exists
        gladys.param.getValues([param1.name]).catch(() => {
            //is they doesn't, we create them
            Promise.all([
                gladys.param.setValue(param1)
            ]);
        });

        if(lang[0].language!='fr-FR')
            return gladys.sentence.insertBatch([sentences.sentenceHelloEn, sentences.sentenceByeEn]);
        else
            return gladys.sentence.insertBatch([sentences.sentenceHelloFr, sentences.sentenceByeFr]);

    });
};
