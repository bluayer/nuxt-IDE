var express = require('express')
var router = express.Router()

var fs = require('fs');
var shell = require('shelljs')

router.post('/', function(req, res, next) {
  var filename = './' + req.body.title

  fs.writeFileSync(filename, req.body.code)
  fs.writeFileSync('./stdin', req.body.input)

  shell.exec('gcc ' + filename, {silent:true}, function(exit, output, error){
    if ( exit ){

        var err_result = {
          "exit":exit,
          "output":'Compile Error!!',
          "error": error
        };
        if(exit!==1){
          res.json(err_result)
          fs.unlinkSync(filename)
          fs.unlinkSync('./stdin')


        }
    }

    if(exit === 1){
      shell.exec('./a.out < ./stdin', {silent:true}, function(exit, output, error){
        var result = {
          "exit": exit,
          "output": output,
          "error": error
        }
      res.json(result)
      console.log(result);


      fs.unlinkSync(filename)
      fs.unlinkSync('./stdin')
    })}
  })
})

module.exports = router
