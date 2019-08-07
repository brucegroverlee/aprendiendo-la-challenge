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