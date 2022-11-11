/* 
  Clase de utilidad
*/
class Util {
  // Cadena de texto html para generar un nuevo elemento de html
  static createComponent(html) {
    // Creamos un parser para generar elemento
    const parser = new DOMParser();

    // Generamos un elemento. Se genera un documento de html completo cuyo body tiene el elemento que queremos
    const componentDocument = parser.parseFromString(html, 'text/html');
    
    // Extraemos el elemento del body
    const element = componentDocument.querySelector('body').childNodes[0];

    return element;
  }

  // Convertir rems a pixeles basándonos en un tamaño de fuente
  static remToPixels(rems) {
    return rems * parseFloat(getComputedStyle(document.documentElement).fontSize); 
  }
}

export default Util;
