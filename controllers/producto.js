// Creación de la Conexión
var mongoose = require('mongoose')
, db_lnk = 'mongodb://localhost/supermercado'
, db = mongoose.createConnection(db_lnk);

// Creación de variables para cargar el modelo
var producto_schema = require('../models/producto')
, Producto = db.model('Producto', producto_schema);

    exports.index = function (req, res, next) {

            Producto.find(gotProducts);

            // NOTA: Creo que es bueno usar verbos en inglés para las funciones,
            //       por lo cómodo que son en estos casos (get, got; find, found)
            function gotProducts (err, productos) {
              if (err) {
                console.log(err);	
                return next();
              }

              return res.render('index', {title: 'Lista de Productos', productos: productos});
            }
  }


    exports.show_edit = function (req, res, next) {

          // Obtención del parámetro id desde la url
          var id = req.params.id

          Producto.findById(id, gotProduct)

          function gotProduct (err, producto) {
            if (err) {
              console.log(err)
              return next(err)
            }

            return res.render('show_edit', {title: 'Ver Producto', producto: producto})
          }
  }

    exports.update = function (req, res, next) {
            var id = req.params.id

            var nombre      = req.body.nombre       || ''
            var descripcion = req.body.descripcion  || ''
            var precio      = req.body.precio       || ''

            // Validemos que nombre o descripcion no vengan vacíos
            if ((nombre=== '') || (descripcion === '')) {
              console.log('ERROR: Campos vacios')
              return res.send('Hay campos vacíos, revisar')
            }

            // Validemos que el precio sea número
            if (isNaN(precio)) {
              console.log('ERROR: Precio no es número')
              return res.send('Precio no es un número !!!!!')
            }

            Producto.findById(id, gotProduct)

            function gotProduct (err, producto) {
              if (err) {
                console.log(err)
                return next(err)
              }

              if (!producto) {
                console.log('ERROR: ID no existe')
                return res.send('ID Inválida!')
              } else {
                producto.nombre       = nombre
                producto.descripcion  = descripcion
                producto.precio       = precio

                producto.save(onSaved)
              }
            }

            function onSaved (err) {
              if (err) {
                console.log(err)
                return next(err)
              }

              return res.redirect('/producto/' + id)
            }
    }