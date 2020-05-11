module.exports = {
    isUser: function(req, res, next){
        
        if(req.session.email){
            return next();
        }
        req.flash('error', 'Please Sign In First');
        res.redirect('/login');
        
    },
    isAdmin: function(req,res,next){
      if(req.session.adminEmail){
          return next();
      }
      req.flash('error','You do not have permission to access this page, Please Sign In First');
      res.redirect('/welcomeadmin');
    }
  }