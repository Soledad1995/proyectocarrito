// Array de productos
const productos = {
    producto1: {
      nombre: 'Vinilos de corte',
      precio: '1000',
      descripcion: 'Contamos con diversas tecnologías de impresión. Te sugerimos que nos cuentes tu proyecto para poder asesorarte que tecnología y sustrato elegir.',
      srcImg: 'https://www.imprimeenspain.com/wp-content/uploads/2017/09/vinilos-decorativos-frases-y-textos-promo-3-x-4-vinilos-D_NQ_NP_172511-MLA20554164040_012016-F.jpg'
    },
    producto2: {
      nombre: 'Vinilo Impreso',
      precio: '1000',
      descripcion: 'Se suele utilizar para una gran cantidad de proyectos de decoración, ya que ofrece una gran cantidad de colores y su adhesivo característico lo hace funcionar bien en grandes espacios.',
      srcImg: 'https://estaticos.qdq.com/swdata/photos/128/128363113/98ae2c51898446cab16fd1367f3abdb4.jpg'
    },
    producto3: {
      nombre: 'Letras Corporeas',
      precio: '1550',
      descripcion: 'Material en acrílico blanco o de color, termoformado por calor, iluminadas con leds.',
      srcImg: 'https://d22fxaf9t8d39k.cloudfront.net/8c3ab65f679a4ec02bee2845a867137eaed0d572aff4783a2eb38f9d7d7699a356227.jpeg'
    },
    producto4: {
      nombre: 'Lonas Publicitarias',
      precio: '850',
      descripcion: 'Las lonas publicitarias y pancartas son uno de los productos más versátiles y comunes, se puede imprimir cualquier tipo de imagen con muy buena calidad. Es una excelente opción para impresiones publicitarias que se colocaran en exteriores debido a su gran resistencia al agua y al sol, las lonas publicitarias pueden resistir hasta 5 años en el exterior.',
      srcImg: 'https://cdeonline.com.py/catalogo/files/resized/products/impresion-lona-impresa-una-cara-2-97061.1800x1800w.jpg'
    },
    producto5: {
      nombre: 'Merchandising',
      precio: '1500',
      descripcion: 'sublimacion',
      srcImg: 'https://expografika.com/n/wp-content/uploads/2020/05/merchandising.jpg'
    }
  }
  // Se captura el template de los productos
  const templateProd = document.getElementById('template-prod').content
  const contenedorProd = document.querySelector('.contenedor-productos')
  const fragment = document.createDocumentFragment()
  
  
  // TODO LO RELACIONADO A AGREGAR LOS PRODUCTOS AL DOM
    Object.values(productos).forEach( producto => {
    templateProd.querySelector('.div-info .nombre-prod').textContent = producto.nombre
    templateProd.querySelector('.div-precio-boton .precio').textContent = producto.precio
    templateProd.querySelector('.div-info .descripcion-prod').textContent = producto.descripcion
    templateProd.querySelector('.contenedor-img img').setAttribute('alt', producto.nombre)
    templateProd.querySelector('.contenedor-img img').setAttribute('src', producto.srcImg)
    const clone = templateProd.cloneNode(true)
    fragment.appendChild(clone)
  })
  contenedorProd.appendChild(fragment)
  
  // TODO LO RELACIONADO AL CARRITO DE COMPRA
  let carrito = {}
  const templateTabla = document.getElementById('agregar-producto-al-carro').content
  const tbodyCarrito = document.getElementById('carrito-body')
  const fragmentTabla = document.createDocumentFragment()
  const templateFoot = document.getElementById('tfooter').content
  const tfootCarrito = document.getElementById('footer')
  
  contenedorProd.addEventListener('click', e => {
    
    if(e.target.textContent === "Agregar") {
        setCarrito(e.target.parentElement.parentElement)
    }
    e.stopPropagation();
  })
  const setCarrito = e => {
    const pivoteCarrito = {
        nombre: e.querySelector('.div-info .nombre-prod').textContent,
        precio: e.querySelector('.div-precio-boton .precio').textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(pivoteCarrito.nombre)){
      carrito[pivoteCarrito.nombre].cantidad += 1
    } else {
      carrito[pivoteCarrito.nombre] = {...pivoteCarrito}
    }
    pintarTabla(carrito)
  }
  
  const pintarTabla = objetoCarrito => {
    Object.values(objetoCarrito).forEach( objeto => {
      const cloneTabla = templateTabla.cloneNode(true)
      cloneTabla.getElementById('producto').textContent = objeto.nombre
      cloneTabla.getElementById('cant').textContent = objeto.cantidad
      cloneTabla.getElementById('precio-uni').textContent = objeto.precio
      let precioTotal = parseFloat(objeto.precio) * objeto.cantidad
      cloneTabla.getElementById('precio-total-prod').textContent = precioTotal.toFixed(2)
      fragmentTabla.appendChild(cloneTabla)
    })
    tbodyCarrito.innerHTML = ''
    tbodyCarrito.appendChild(fragmentTabla)
    pintarFooter()
  }
  const pintarFooter = () => {
    tfootCarrito.innerHTML = ''
    if(Object.keys(carrito).length === 0) {
      tfootCarrito.innerHTML = '<tr><td colspan = 4>¡No hay ningun elemento en el carrito!</td></tr>'
    } else {
      const total = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + (cantidad * precio),0)
      templateFoot.getElementById('total-a-pagar').textContent = total.toFixed(2)
      const cloneFoot = templateFoot.cloneNode(true)
      fragment.appendChild(cloneFoot)
      tfootCarrito.appendChild(fragment)
      
      //Boton Vaciar carrito
      const botonVaciar = document.querySelector('vaciar-tabla')
      botonVaciar.addEventListener ('click', ()=> {
        Swal.fire ({
            title:'esta seguro de eliminar el producto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'no, no quiero'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'borrado',
                    icon:'success',
                    text:'el archivo ha sido borrado'
                })
            }
        }
        )
      }
      )
     /* const botonVaciar = document.getElementById('vaciar-tabla')
    botonVaciar.addEventListener('click', () => {
        carrito = {}
        pintarTabla(carrito)
        pintarFooter()
      })*/
      
      //Botones aumentar y disminuir cantidades
      
    }
  }
  tbodyCarrito.addEventListener('click', e => {
    
    if(e.target.classList.contains('button')) {
      aumentarDisminuir(e.target)
    }
  })
  const aumentarDisminuir = boton => {
    if(boton.textContent === '+'){
      const indicador = boton.parentElement.parentElement.firstElementChild.textContent
      Object.values(carrito).forEach( elemento => {
        if(elemento.nombre === indicador) {
        carrito[elemento.nombre].cantidad++  
        }
      })
    }
    if(boton.textContent === '-') {
      const indicador = boton.parentElement.parentElement.firstElementChild.textContent
      Object.values(carrito).forEach( elemento => {
        if(elemento.nombre === indicador) {
        carrito[elemento.nombre].cantidad--
          if(carrito[elemento.nombre].cantidad === 0) {
            delete carrito[elemento.nombre]
          }
        }
      })
    }
    pintarTabla(carrito)
    pintarFooter()
  }
  
