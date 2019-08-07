Aprendiendo-la challenge
=====================

## Preguntas

### 1. En qué lenguaje creamos nuestra API?
El lenguaje que usaré es Javascript (Node.js). Debido a que si es necesario escalar la aplicación usando la arquitectura FaaS (Function as a Service) más adelante, Node.js es soportado por los tres mayores proveedores de Cloud Computing (AWS, GCP, Azure). Mientras que PHP por ejemplo ninguno de ellos lo soportan nativamente. ([Referencia AWS Lambda runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html))

### 2. Con qué framework de ese lenguaje? Cuál nos da mayor rapidez de experimentación? Cuál es más fácil de aprender? Qué tan maduro está el framework a nivel de industria? Qué tan buenas librerías, SDK’s y ORM’s tiene? Qué tan eficiente es?
El framework que usaré es Express. Es un standard para levantar aplicaciones web en Node.js. Está muy bien documentada, teniendo así una buena curva de aprendizaje. Por otro lado, está permanentemente actualizada por una amplia comunidad (367 contribuidores). Su último commit es de hace 25 días.

### 3. Qué estructura de archivos usamos?
La organización de archivos será por modulos y usando el paradigma de Programación funcional para facilitar el testing y mantener el código más limpio. 

## Observaciones
El archivo **.env** será omitido en el **.gitignore** para efecto del reto técnico.

## Scripts
#### Run
```
npm start
```
#### Test
```
npm test
```

## Class
| country   |
|-----------|
| name      |
| currency  |
| phoneCode |
| isoCode   |

## DB
```sql
CREATE TABLE `countries` (
  `name` varchar(30) NOT NULL,
  `currency` varchar(3) NOT NULL,
  `phoneCode` varchar(5) NOT NULL,
  `isoCode` varchar(2) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

## API Reference

#### POST /COUNTRIES

##### Request
```
POST http://{host}:{port}/countries
```
##### Header
```
Content-type: application/json
```
##### Body
```js
{
  "name": String,
  "currency": String,
  "phoneCode": String,
  "isoCode": String
}
```

<table>
  <thead>
    <tr>
      <th colspan="3">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>CODE</th>
      <th>Description</th>
      <th>Data</th>
    </tr>
    <tr>
      <td style="color:green;">201 CREATED</td>
      <td>success</td>
      <td>no content</td>
    </tr>
    <tr>
      <td style="color:red;">406 NOT ACCEPTABLE</td>
      <td>failed. Some field was empty, undefined or the name is not available.</td>
      <td>
<pre>{
  "message": String
}</pre>
      </td>
    </tr>
  </tbody>
</table>

#### GET /COUNTRIES

##### Request
```
GET http://{host}:{port}/countries
```
##### Header
```
Content-type: application/json
```
##### Body
```js
NO CONTENT
```

<table>
  <thead>
    <tr>
      <th colspan="3">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>CODE</th>
      <th>Description</th>
      <th>Data</th>
    </tr>
    <tr>
      <td style="color:green;">200 OK</td>
      <td>success</td>
      <td><pre>Object[]</pre></td>
    </tr>
  </tbody>
</table>

#### GET /COUNTRIES/{name}

##### Request
```
GET http://{host}:{port}/countries/{country-name}
```
##### Header
```
Content-type: application/json
```
##### Body
```js
NO CONTENT
```

<table>
  <thead>
    <tr>
      <th colspan="3">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>CODE</th>
      <th>Description</th>
      <th>Data</th>
    </tr>
    <tr>
      <td style="color:green;">200 OK</td>
      <td>success</td>
      <td><pre>{
  "name": String,
  "currency": String,
  "phoneCode": String,
  "isoCode": String
}</pre></td>
    </tr>
    <tr>
      <td style="color:red;">406 NOT ACCEPTABLE</td>
      <td>failed. The name is empty or undefined.</td>
      <td>
<pre>{
  "message": String
}</pre>
      </td>
    </tr>
  </tbody>
</table>

#### PUT /COUNTRIES/{name}

##### Request
```
PUT http://{host}:{port}/countries/{country-name}
```
##### Header
```
Content-type: application/json
```
##### Body
```js
{
  "currency": String,
  "phoneCode": String,
  "isoCode": String
}
```

<table>
  <thead>
    <tr>
      <th colspan="3">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>CODE</th>
      <th>Description</th>
      <th>Data</th>
    </tr>
    <tr>
      <td style="color:green;">202 ACCEPTED</td>
      <td>success</td>
      <td>no content</td>
    </tr>
    <tr>
      <td style="color:red;">406 NOT ACCEPTABLE</td>
      <td>failed. Some field was empty or undefined</td>
      <td>
<pre>{
  "message": String
}</pre>
      </td>
    </tr>
  </tbody>
</table>

#### DELETE /COUNTRIES/{name}

##### Request
```
DELETE http://{host}:{port}/countries/{country-name}
```
##### Header
```
Content-type: application/json
```
##### Body
```js
NO CONTENT
```

<table>
  <thead>
    <tr>
      <th colspan="3">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>CODE</th>
      <th>Description</th>
      <th>Data</th>
    </tr>
    <tr>
      <td style="color:green;">202 ACCEPTED</td>
      <td>success</td>
      <td>no content</td>
    </tr>
    <tr>
      <td style="color:red;">406 NOT ACCEPTABLE</td>
      <td>failed. The name doesn't exist.</td>
      <td>
<pre>{
  "message": String
}</pre>
      </td>
    </tr>
  </tbody>
</table>