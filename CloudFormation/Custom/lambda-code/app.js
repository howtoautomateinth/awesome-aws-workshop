var response = require('cfn-response');

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.lambdaHandler = async (event, context) => {
    try {
        var responseData = {
            'statusCode': 200,
            'randomString': makeid(event.ResourceProperties.StringLength),
            'body': JSON.stringify({
                message: 'hello world',
            })
        }
        response.send(event, context, response.SUCCESS, responseData);
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
