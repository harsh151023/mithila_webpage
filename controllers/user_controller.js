module.exports.user = function(req, res){
    console.log(req.cookies);
    res.cookie('user_id', 25);
    return res.render('user',
    );
}

// module.exports.actionName = function(req, res){}