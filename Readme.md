# Vimark

## [Ver la web](https://vimark.cyclic.app/)


# Descripción

Nuestra app trata de una plataforma de e-commerce de productos virales,
en ella podemos buscar dichos productos por nombre o número de referencia, dandonos
por resultado un listado de tiendas en las que esté disponible, así como los precios,
redirigiéndonos a sus respectivas páginas para adquirirlo.

# User stories -404 -500

- login, signup
- add-signup
- home
- product search results
- product details
- user profile
- supplier

# User.model

- const userSchema = new Schema{
  firstName: String,
  lastName: String,
  username: {
  type: String,
  trim: true,
  unique: true },
  email: {
  type: String,
  required: true,
  unique: true },
  password: {
  type: String,
  required: true },
  role:{ type:String,
  enum: ["user","admin"],
  default:"user" }

- product = {
  name: String,
  description: String,
  category: enum: [ maquillaje, ropa, perfumería, cuidado de la piel ]
  supplier:[{ type: mongoose.Schema.Types.ObjectId,
  ref: "Supplier" }] })

- supplier = {
  name: String,
  location: String }

# API routes (back-end)

# ROUTE AUTH // aqui van las rutas de autenticación (signup y login)

- GET "/" => renderizar la vista de formulario registro (renders login-signup.hbs)
- GET "/auth/signup" redirect to / if user logged in (renders add-signup.hbs)
- POST "/auth/signup" => recibir la info del formulario y crear el perfil en la BD (redirect to / if user logged in)
- POST "/auth/login" => recibe las credenciales del usuario y lo valida
- POST "/auth/logout" => cerrar la sesión (destruirla)
- GET (/renders homepage.hbs)
- POST /home (search)
- GET /product-search (renders product-search.hbs)

# ROUTE PRODUCT

- GET "/products" ->ruta donde el usuario puede ver una lista de los productos
  - Product.find() // busca los productos de la BD
- GET "/products/:productId/details" -> ruta para renderizar la info completa del producto
  - Product.findById(productId)

# ROUTE SUPPLIER

- GET "/supplier" => listar los vendedores de la BD

# Enlaces adicionales (los enlaces se pueden agregar más tarde cuando estén disponibles)

### Trello

[Enlace](https://trello.com/invite/b/evhKMOWT/ATTI41c588cc35ec63fb720a4daa101be5ca591E9E08/vimark))

### Diapositivas

[Enlace](https://www.canva.com/design/DAFQUnnKGRI/8eeynoPhjPC2_Xaqk4C8wA/view?utm_content=DAFQUnnKGRI&utm_campaign=designshare&utm_medium=link&utm_source=publishpresent)
