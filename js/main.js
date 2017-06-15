//OBTENER URL DE API
var api = {
  url: "https://examen-laboratoria-sprint-5.herokuapp.com/topics/"
};

//SE OBTIENE ESPACIO PARA AGREGAR
var $listaTemas = $("#lista-temas");

var cargarPagina = function (){
  cargarTemas();
  $("#form-tareaNueva").submit(nuevoTema);
};

var cargarTemas = function (){
  $.getJSON(api.url, function (temas){
    temas.forEach(crearTema);
  });
};

var crearTema = function (tema) {
  var autor = tema.author_name;
  var mensaje = tema.content;
  var respuestas = tema.responses_count;
  var id = tema.id;

  var $tr = $("<tr />", {
    "data-id":id
  });

  //SE CREAN LAS CELDAS +td
  //celda nombre autor
  var $nombreAutorTD = $("<td />");
  $nombreAutorTD.text(autor);
  //celda mensaje de tema
  var $mensajeTemaTD = $("<td />");
  $mensajeTemaTD.text(mensaje);
  //celda respuestas
  var $respuestasTD = $("<td />");
  $respuestasTD.text(respuestas);

  //SE AGREGAN LAS CELDAS A LA FILA td+tr
  //autor a tr
  $tr.append($nombreAutorTD);
  $tr.append($mensajeTemaTD);
  $tr.append($respuestasTD);

  // SE AGEGAN LAS FILAS A LA TABLA tr+table
  $listaTemas.append($tr);

};

var nuevoTema = function (e){
  e.preventDefault(); //evita el comportamiento automatico de recargarse
  var autor = $("#nombre-autor").val();
  var mensaje = $("#mensaje-tema").val();
  $.post(api.url, {
    author_name: autor,
    content: mensaje
  }, function(tema){
    crearTema(tema);
    $("#modalNuevoTema").modal('hide');
  });
};

var arregloDeTemas = []; //se crea un arreglo vacio para guardar los temas
$.getJSON(api.url, function (temas){ //se obtiene JSON
  temas.forEach(function(tema){
    arregloDeTemas.push(tema) //empuja el tema al arreglo
  });
});

var filtrarTemas = function (e){
  e.preventDefault();
  var buscarTema = $("#inputBuscarTema").val().toLowerCase();//obtiene el valor del input
  var filtreoDeTemas = arregloDeTemas.filter(function(tema){//filtra lo que hay en el arreglo
    var temaBuscado = tema.content.toLowerCase().indexOf(buscarTema) >= 0;// se comprara para que lea todo
    return temaBuscado;//regresa el resultado
  });
  crearTema(filtreoDeTemas);
};


$(document).ready(cargarPagina);
