exports.index = (req, res) ->
	res.render "index",
		title: "Hola mundo"
exports.lista = (req, res) ->
	res.render "lista",
		title: "Lista de Datos"	
exports.productos = (req, res) ->
	res.render "productos",
		title: "Productos"	
