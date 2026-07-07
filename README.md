# Innovatech-EKS-DevOps-EP3

Proyecto DevOps EP3 para Innovatech Chile. Consiste en el despliegue de una aplicación web compuesta por frontend, dos backends y una base de datos MySQL sobre AWS EKS, usando Docker, Docker Compose, Amazon ECR, Kubernetes, Terraform, HPA, Metrics Server y GitHub Actions.

---

## Descripción del proyecto

El proyecto implementa una arquitectura contenerizada en Kubernetes sobre Amazon EKS. La aplicación está formada por:

- Frontend de despacho desarrollado con React y Vite.
- Backend de ventas desarrollado con Spring Boot.
- Backend de despachos desarrollado con Spring Boot.
- Base de datos MySQL 8.
- Docker Compose para levantar el entorno local de desarrollo.
- Manifiestos Kubernetes para deployments, services, namespace, configmap, secrets, PV, PVC y HPA.
- Infraestructura AWS creada con Terraform.
- Pipeline CI/CD automatizado con GitHub Actions.
- Pruebas automatizadas para los backends usando perfil `test` con H2.

El objetivo principal es demostrar un flujo DevOps completo: infraestructura como código, construcción de imágenes Docker, ejecución de pruebas, publicación en Amazon ECR, despliegue en Kubernetes y validación de servicios en AWS.

---

## Arquitectura general

La solución se despliega en AWS usando los siguientes componentes:

```text
GitHub Repository
      |
      v
GitHub Actions
      |
      +--> Validación frontend y tests backend
      |
      v
Docker Build
      |
      v
Amazon ECR
      |
      v
Amazon EKS
      |
      +--> Frontend React - Service LoadBalancer - Público
      |
      +--> Backend Ventas - Service ClusterIP - Interno
      |
      +--> Backend Despachos - Service ClusterIP - Interno
      |
      +--> MySQL - Service ClusterIP - Interno
                |
                v
             PV / PVC
```

El frontend es el único servicio expuesto públicamente mediante un LoadBalancer. Los backends y MySQL quedan internos dentro del cluster usando servicios de tipo ClusterIP. MySQL utiliza persistencia mediante PV/PVC para conservar los datos aunque el pod se reinicie.

---

## Tecnologías utilizadas

- AWS
- Amazon EKS
- Amazon ECR
- Amazon EC2
- Elastic Load Balancer
- Terraform
- Kubernetes
- kubectl
- Docker
- Docker Compose
- GitHub Actions
- Metrics Server
- HPA
- React
- Vite
- Tailwind CSS
- Spring Boot
- Java 17
- Maven
- MySQL 8
- H2 Database para pruebas

---

## Servicios del proyecto

| Servicio | Tecnología | Puerto | Tipo de Service | Descripción |
|---|---|---:|---|---|
| Frontend Despacho | React + Vite | 80 / 30801 | LoadBalancer | Interfaz web pública |
| Backend Ventas | Spring Boot | 8080 | ClusterIP | API interna de ventas |
| Backend Despachos | Spring Boot | 8081 | ClusterIP | API interna de despachos |
| MySQL | MySQL 8 | 3306 | ClusterIP | Base de datos interna |

En ejecución local con Docker Compose, los servicios quedan disponibles en:

```text
Frontend: http://localhost
Backend Ventas Swagger: http://localhost:8080/swagger-ui/index.html
Backend Despachos Swagger: http://localhost:8081/swagger-ui/index.html
MySQL: localhost:3306
```

---

## Estructura principal del proyecto

```text
Innovatech-EKS-DevOps-EP3/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── backend/
│   ├── back-Ventas_SpringBoot/
│   │   └── Springboot-API-REST/
│   │       ├── .env.example
│   │       ├── Dockerfile
│   │       ├── pom.xml
│   │       └── src/
│   │
│   └── back-Despachos_SpringBoot/
│       └── Springboot-API-REST-DESPACHO/
│           ├── .env.example
│           ├── Dockerfile
│           ├── pom.xml
│           └── src/
│
├── frontend/
│   └── front_despacho/
│       ├── .env.example
│       ├── Dockerfile
│       ├── package.json
│       ├── vite.config.js
│       └── src/
│
├── infra/
│   ├── terraform/
│   │   ├── provider.tf
│   │   ├── variables.tf
│   │   ├── vpc.tf
│   │   ├── eks.tf
│   │   ├── ecr.tf
│   │   ├── security.tf
│   │   └── outputs.tf
│   │
│   └── k8s/
│       ├── .env.example
│       ├── namespace.yml
│       ├── configmap.yml
│       ├── secrets.example.yml
│       ├── mysql-pv.yml
│       ├── mysql-pvc.yml
│       ├── mysql-deployment.yml
│       ├── mysql-service.yml
│       ├── backend-ventas-deployment.yml
│       ├── backend-ventas-service.yml
│       ├── backend-despachos-deployment.yml
│       ├── backend-despachos-service.yml
│       ├── frontend-deployment.yml
│       ├── frontend-service.yml
│       └── hpa.yml
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

## Ejecución local con Docker Compose

El proyecto incluye un archivo `docker-compose.yml` en la raíz para levantar el entorno local con frontend, backends y MySQL.

Primero copiar el archivo de ejemplo:

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Validar la configuración de Docker Compose:

```bash
docker compose --env-file .env.example config
```

Levantar el proyecto localmente:

```bash
docker compose --env-file .env.example up --build
```

También se puede levantar en segundo plano:

```bash
docker compose --env-file .env.example up -d --build
```

Ver los servicios levantados:

```bash
docker compose --env-file .env.example ps
```

Detener los servicios:

```bash
docker compose --env-file .env.example down
```

No usar `-v` si se desea conservar el volumen local de MySQL.

---

## Infraestructura con Terraform

La infraestructura se encuentra en:

```bash
infra/terraform
```

Terraform crea los siguientes recursos:

- VPC para el proyecto.
- Subredes públicas en distintas zonas de disponibilidad.
- Internet Gateway.
- Tablas de ruteo.
- Security Groups para EKS y nodos.
- Cluster Amazon EKS.
- Node Group para ejecutar los pods.
- Repositorios Amazon ECR.
- Outputs con datos útiles del despliegue.

---

## Recursos creados en AWS

Durante la implementación se creó el cluster:

```text
innovatech-eks
```

Namespace de Kubernetes:

```text
innovatech
```

Repositorios ECR:

```text
frontend-despacho
backend-ventas
backend-despachos
```

Región utilizada:

```text
us-east-1
```

---

## Comandos Terraform

Entrar a la carpeta de Terraform:

```bash
cd infra/terraform
```

Inicializar Terraform:

```bash
terraform init
```

Revisar los recursos que se crearán:

```bash
terraform plan
```

Crear la infraestructura:

```bash
terraform apply
```

Cuando Terraform pregunte, escribir:

```text
yes
```

Ver los outputs:

```bash
terraform output
```

Eliminar la infraestructura cuando ya no se necesite:

```bash
terraform destroy
```

---

## Configuración de credenciales AWS Academy

Antes de usar Terraform, AWS CLI o kubectl, se deben configurar las credenciales temporales del laboratorio AWS Academy.

En PowerShell:

```powershell
$env:AWS_ACCESS_KEY_ID="ACCESS_KEY_REAL"
$env:AWS_SECRET_ACCESS_KEY="SECRET_KEY_REAL"
$env:AWS_SESSION_TOKEN="SESSION_TOKEN_REAL"
$env:AWS_DEFAULT_REGION="us-east-1"
```

Validar credenciales:

```powershell
aws sts get-caller-identity
```

Conectar kubectl al cluster EKS:

```powershell
aws eks update-kubeconfig --region us-east-1 --name innovatech-eks
```

Validar nodos:

```powershell
kubectl get nodes
```

---

## Manifiestos Kubernetes

Los manifiestos Kubernetes están ubicados en:

```text
infra/k8s
```

Estos archivos permiten crear:

- Namespace `innovatech`.
- ConfigMap con datos de conexión.
- Secret de MySQL creado desde GitHub Secrets.
- Deployment y Service de MySQL.
- PersistentVolume y PersistentVolumeClaim para MySQL.
- Deployment y Service de backend ventas.
- Deployment y Service de backend despachos.
- Deployment y Service del frontend.
- HPA para escalamiento automático.

Para validar la persistencia de MySQL:

```bash
kubectl get pvc -n innovatech
```

Resultado esperado:

```text
mysql-pvc   Bound
```

---

## GitHub Actions

El workflow de despliegue está en:

```text
.github/workflows/deploy.yml
```

El pipeline se ejecuta automáticamente cuando se hace push a la rama:

```text
deploy
```

---

## Flujo del pipeline CI/CD

El workflow realiza los siguientes pasos:

| Paso | Acción | Descripción |
|---:|---|---|
| 1 | Checkout del repositorio | Descarga el código fuente |
| 2 | Configurar Node.js | Prepara Node para validar el frontend |
| 3 | Validar build del frontend | Ejecuta `npm ci` y `npm run build` |
| 4 | Configurar Java 17 | Prepara Java para ejecutar pruebas Maven |
| 5 | Tests backend ventas | Ejecuta pruebas del backend ventas |
| 6 | Tests backend despachos | Ejecuta pruebas del backend despachos |
| 7 | Configurar credenciales AWS | Usa los Secrets de GitHub para conectarse a AWS |
| 8 | Instalar dependencias | Instala `gettext-base` para usar `envsubst` |
| 9 | Login en Amazon ECR | Permite publicar imágenes Docker |
| 10 | Crear URLs ECR | Genera las rutas de las imágenes |
| 11 | Build frontend | Construye la imagen del frontend |
| 12 | Push frontend | Sube la imagen a ECR |
| 13 | Build backend ventas | Construye la imagen del backend ventas |
| 14 | Push backend ventas | Sube la imagen a ECR |
| 15 | Build backend despachos | Construye la imagen del backend despachos |
| 16 | Push backend despachos | Sube la imagen a ECR |
| 17 | Instalar kubectl | Prepara kubectl en GitHub Actions |
| 18 | Conectar a EKS | Actualiza kubeconfig del runner |
| 19 | Instalar Metrics Server | Habilita métricas para HPA |
| 20 | Preparar manifiestos | Reemplaza variables de imagen en los YAML |
| 21 | Aplicar Kubernetes | Aplica namespace, configmap, secret, PV, PVC, deployments, services y HPA |
| 22 | Validar rollout | Espera que los deployments queden disponibles |
| 23 | Mostrar recursos | Lista pods, services, PVC y HPA desplegados |
| 24 | Obtener URL frontend | Muestra la URL pública del LoadBalancer |

---

## Pruebas automatizadas

Los backends cuentan con pruebas automatizadas para validar que el contexto de Spring Boot cargue correctamente.

Se agregó un perfil de pruebas:

```text
test
```

Archivos de configuración de pruebas:

```text
backend/back-Ventas_SpringBoot/Springboot-API-REST/src/test/resources/application-test.properties
backend/back-Despachos_SpringBoot/Springboot-API-REST-DESPACHO/src/test/resources/application-test.properties
```

Durante las pruebas se utiliza H2 en memoria para no depender de MySQL real.

Ejecutar pruebas backend ventas:

```bash
cd backend/back-Ventas_SpringBoot/Springboot-API-REST
./mvnw test
```

En Windows PowerShell:

```powershell
cd backend/back-Ventas_SpringBoot/Springboot-API-REST
.\mvnw.cmd test
```

Ejecutar pruebas backend despachos:

```bash
cd backend/back-Despachos_SpringBoot/Springboot-API-REST-DESPACHO
./mvnw test
```

En Windows PowerShell:

```powershell
cd backend/back-Despachos_SpringBoot/Springboot-API-REST-DESPACHO
.\mvnw.cmd test
```

El pipeline ejecuta estas pruebas automáticamente antes de construir y subir imágenes a ECR.

---

## Secrets y variables de GitHub

En GitHub se configuraron en:

```text
Settings > Secrets and variables > Actions
```

### Secrets

Estos valores son sensibles:

```text
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_SESSION_TOKEN
MYSQL_ROOT_PASSWORD
MYSQL_USER
MYSQL_PASSWORD
```

Las credenciales de MySQL se usan para crear el Secret de Kubernetes desde GitHub Actions. De esta manera no se sube un archivo `secrets.yml` con contraseñas reales al repositorio.

### Variables

Estas variables son usadas por el workflow:

```text
AWS_REGION
AWS_ACCOUNT_ID
EKS_CLUSTER_NAME
K8S_NAMESPACE
ECR_FRONTEND_REPOSITORY
ECR_VENTAS_REPOSITORY
ECR_DESPACHOS_REPOSITORY
```

Valores usados en el proyecto:

```text
AWS_REGION=us-east-1
EKS_CLUSTER_NAME=innovatech-eks
K8S_NAMESPACE=innovatech
ECR_FRONTEND_REPOSITORY=frontend-despacho
ECR_VENTAS_REPOSITORY=backend-ventas
ECR_DESPACHOS_REPOSITORY=backend-despachos
```

---

## Variables de entorno y archivos `.env.example`

El proyecto incluye archivos `.env.example` como referencia para documentar las variables de entorno necesarias en cada componente, sin exponer credenciales reales dentro del repositorio.

Estos archivos sirven como guía para que otro integrante o evaluador pueda entender qué variables necesita configurar el frontend, los backends, Docker Compose y Kubernetes.

Archivos agregados:

```text
.env.example
frontend/front_despacho/.env.example
backend/back-Ventas_SpringBoot/Springboot-API-REST/.env.example
backend/back-Despachos_SpringBoot/Springboot-API-REST-DESPACHO/.env.example
infra/k8s/.env.example
infra/k8s/secrets.example.yml
```

Los archivos `.env` reales no deben subirse al repositorio, ya que pueden contener contraseñas, tokens o credenciales sensibles.

Para trabajar localmente, se debe copiar el archivo de ejemplo y completar los valores correspondientes:

```bash
cp .env.example .env
```

Ejemplo de variables usadas por Docker Compose:

```env
MYSQL_ROOT_PASSWORD=root123
MYSQL_USER=innovatech_user
MYSQL_PASSWORD=innovatech123

DB_NAME=innovatech
DB_PORT=3306

BACKEND_VENTAS_PORT=8080
BACKEND_DESPACHOS_PORT=8081
FRONTEND_PORT=80
```

Ejemplo de variables usadas por los backends:

```env
DB_ENDPOINT=localhost
DB_PORT=3306
DB_NAME=innovatech
DB_USERNAME=innovatech_user
DB_PASSWORD=change_me
```

Ejemplo de variables usadas por el frontend:

```env
VITE_APP_NAME=Innovatech
VITE_API_BASE_URL=/api/v1
VITE_BACKEND_VENTAS_ENDPOINT=/api/v1/ventas
VITE_BACKEND_DESPACHOS_ENDPOINT=/api/v1/despachos
```

En Kubernetes, las variables no sensibles se gestionan mediante `ConfigMap` y las credenciales mediante `Secret`.

Archivos relacionados:

```text
infra/k8s/configmap.yml
infra/k8s/secrets.example.yml
```

El archivo real `infra/k8s/secrets.yml` no se sube al repositorio. Se mantiene ignorado mediante `.gitignore` y el pipeline crea el Secret de MySQL usando GitHub Secrets.

Esta separación permite mantener el proyecto más seguro, ordenado y fácil de desplegar en distintos entornos.

---

## Ejecución local del frontend

Entrar a la carpeta del frontend:

```bash
cd frontend/front_despacho
```

Instalar dependencias:

```bash
npm install
```

Ejecutar en modo desarrollo:

```bash
npm run dev
```

Abrir en navegador:

```text
http://localhost:5173
```

Compilar para producción:

```bash
npm run build
```

---

## Construcción de imágenes Docker

Cada componente cuenta con su propio Dockerfile:

```text
frontend/front_despacho/Dockerfile
backend/back-Ventas_SpringBoot/Springboot-API-REST/Dockerfile
backend/back-Despachos_SpringBoot/Springboot-API-REST-DESPACHO/Dockerfile
```

Los Dockerfile de los backends usan Maven y Java 17. Actualmente ejecutan el empaquetado sin saltarse pruebas:

```bash
mvn clean package
```

Construir backend ventas localmente:

```bash
docker compose --env-file .env.example build backend-ventas-service
```

Construir backend despachos localmente:

```bash
docker compose --env-file .env.example build backend-despachos-service
```

Forzar build sin caché:

```bash
docker compose --env-file .env.example build --no-cache backend-ventas-service
docker compose --env-file .env.example build --no-cache backend-despachos-service
```

---

## Validación del despliegue en Kubernetes

Conectar kubectl al cluster:

```bash
aws eks update-kubeconfig --region us-east-1 --name innovatech-eks
```

Ver nodos:

```bash
kubectl get nodes
```

Ver pods:

```bash
kubectl get pods -n innovatech -o wide
```

Resultado esperado:

```text
backend-despachos   Running
backend-ventas      Running
frontend-despacho   Running
mysql               Running
```

Ver deployments:

```bash
kubectl get deployments -n innovatech
```

Resultado esperado:

```text
backend-despachos   5/5
backend-ventas      5/5
frontend-despacho   2/2
mysql               1/1
```

Ver services:

```bash
kubectl get svc -n innovatech
```

Resultado esperado:

```text
backend-despachos-service    ClusterIP
backend-ventas-service       ClusterIP
frontend-despacho-service    LoadBalancer
mysql-service                ClusterIP
```

Ver PVC:

```bash
kubectl get pvc -n innovatech
```

Resultado esperado:

```text
mysql-pvc   Bound
```

Ver HPA:

```bash
kubectl get hpa -n innovatech
```

---

## Acceso al frontend

El frontend se accede desde el DNS del LoadBalancer.

Obtener la URL:

```bash
kubectl get svc -n innovatech
```

Buscar el servicio:

```text
frontend-despacho-service
```

Copiar el valor de la columna:

```text
EXTERNAL-IP
```

Abrir en navegador usando HTTP:

```text
http://DNS_DEL_LOAD_BALANCER
```

El pipeline también muestra la URL pública del frontend al finalizar correctamente.

---

## Validación de backends internos

Los backends no son públicos. Se validan dentro del cluster porque sus servicios son de tipo ClusterIP.

Crear un pod temporal con curl:

```bash
kubectl run test-curl -n innovatech --rm -it --image=curlimages/curl -- sh
```

Probar backend ventas:

```sh
curl http://backend-ventas-service:8080
```

Probar backend despachos:

```sh
curl http://backend-despachos-service:8081
```

Si responde `404` en la ruta raíz, significa que el backend está activo, pero no tiene una ruta `/` definida. Para probar funcionalidad real se deben usar los endpoints propios de cada API.

Salir del contenedor:

```sh
exit
```

---

## Metrics Server y HPA

Para que el HPA pueda leer CPU y memoria se instaló Metrics Server.

Instalación:

```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

En EKS fue necesario agregar el argumento:

```text
--kubelet-insecure-tls
```

Validar Metrics Server:

```bash
kubectl get pods -n kube-system
```

Validar métricas de nodos:

```bash
kubectl top nodes
```

Validar métricas de pods:

```bash
kubectl top pods -n innovatech
```

Validar HPA:

```bash
kubectl get hpa -n innovatech
```

Resultado esperado:

```text
backend-despachos-hpa   cpu: valor/50%
backend-ventas-hpa      cpu: valor/50%
frontend-despacho-hpa   cpu: valor/60%
```

---

## Prueba de auto-healing

Kubernetes permite recuperar automáticamente pods eliminados.

Ver pods actuales:

```bash
kubectl get pods -n innovatech
```

Eliminar un pod del frontend:

```bash
kubectl delete pod NOMBRE_DEL_POD -n innovatech
```

Observar la recuperación automática:

```bash
kubectl get pods -n innovatech -w
```

Kubernetes crea un nuevo pod para mantener la cantidad de réplicas definida en el deployment.

Salir del modo observación:

```text
Ctrl + C
```

---

## Seguridad aplicada

El proyecto aplica buenas prácticas básicas de seguridad:

- El frontend es el único servicio público mediante LoadBalancer.
- Los backends son internos mediante ClusterIP.
- MySQL es interno mediante ClusterIP.
- Las credenciales AWS se almacenan como GitHub Secrets.
- Las credenciales de MySQL se almacenan como GitHub Secrets.
- El Secret de MySQL se crea automáticamente desde el pipeline.
- Las variables no sensibles se almacenan como GitHub Variables.
- Se agregaron archivos `.env.example` para documentar variables sin exponer credenciales reales.
- Se agregó `secrets.example.yml` como plantilla sin valores reales.
- El archivo real `infra/k8s/secrets.yml` se excluye del repositorio mediante `.gitignore`.
- Los archivos `.env` reales se excluyen del repositorio mediante `.gitignore`.
- La infraestructura se crea con Terraform.
- Los archivos `terraform.tfstate`, `.terraform` y `*.tfvars` no deben subirse al repositorio.
- Los nodos se distribuyen en distintas zonas de disponibilidad.
- ECR utiliza cifrado AES-256.
- Los repositorios ECR usan inmutabilidad de etiquetas.
- Los Dockerfile backend ejecutan pruebas durante el empaquetado.

---

## Buenas prácticas aplicadas

- Infraestructura como código con Terraform.
- Separación entre frontend, backends y base de datos.
- Contenedorización con Docker.
- Orquestación local con Docker Compose.
- Publicación de imágenes en Amazon ECR.
- Despliegue automatizado con GitHub Actions.
- Validación de build frontend en CI/CD.
- Ejecución de pruebas backend en CI/CD.
- Manifiestos Kubernetes separados por responsabilidad.
- Namespace propio para la aplicación.
- Services internos para backends y base de datos.
- LoadBalancer solo para el frontend.
- Persistencia para MySQL mediante PV/PVC.
- HPA configurado para escalamiento.
- Metrics Server habilitado para métricas.
- Validación de rollout en el pipeline.
- Documentación de variables de entorno mediante archivos `.env.example`.
- Uso de ramas, principalmente `deploy` para despliegue.

---

## Problemas resueltos durante el desarrollo

### Error en GitHub Actions al crear URLs de ECR

Se corrigió el workflow para usar el registry entregado por `amazon-ecr-login`, evitando errores por formato inválido en `$GITHUB_ENV`.

### Error de conexión MySQL

Los backends entraban en `CrashLoopBackOff` por el error:

```text
Public Key Retrieval is not allowed
```

Se corrigió la URL JDBC agregando:

```text
allowPublicKeyRetrieval=true
```

### HPA sin métricas

El HPA aparecía con CPU `<unknown>` porque no estaba instalado Metrics Server. Se instaló y configuró Metrics Server, permitiendo visualizar métricas con:

```bash
kubectl top nodes
kubectl top pods -n innovatech
```

### Docker Compose no disponible inicialmente

Se agregó un archivo `docker-compose.yml` para levantar frontend, backends y MySQL en entorno local, incluyendo red interna y volumen local para MySQL.

### Tests no visibles en el pipeline

Se agregaron etapas de validación al pipeline para compilar el frontend y ejecutar pruebas de ambos backends antes de construir y subir imágenes a ECR.

### Secret de Kubernetes expuesto en repositorio

Se reemplazó el uso directo de `secrets.yml` por GitHub Secrets. Además, se agregó `secrets.example.yml` como plantilla segura y se excluyó `secrets.yml` mediante `.gitignore`.

### MySQL sin persistencia

Se agregó persistencia para MySQL usando `PersistentVolume` y `PersistentVolumeClaim`, dejando el PVC en estado `Bound`.

### Dockerfile backend saltaba pruebas

Se eliminó el uso de `-DskipTests` en los Dockerfile backend, permitiendo que el empaquetado ejecute pruebas durante el build.

---

## Estado final del proyecto

El proyecto queda con:

- Infraestructura creada en AWS mediante Terraform.
- Cluster EKS activo.
- Dos nodos disponibles para ejecutar workloads.
- Tres repositorios ECR para imágenes Docker.
- Pipeline CI/CD funcional con GitHub Actions.
- Validación de build frontend dentro del pipeline.
- Pruebas backend ejecutadas dentro del pipeline.
- Imágenes construidas y subidas automáticamente a ECR.
- Aplicación desplegada en Kubernetes.
- Frontend público mediante LoadBalancer.
- Backends internos mediante ClusterIP.
- MySQL interno mediante ClusterIP.
- MySQL con persistencia mediante PV/PVC.
- Deployments disponibles y pods en estado Running.
- HPA configurado con métricas reales.
- Metrics Server funcionando.
- Prueba de auto-healing disponible para evidencia.
- Docker Compose para ejecución local.
- Archivos `.env.example` agregados para documentar variables de entorno sin exponer credenciales.
- Archivo `secrets.example.yml` como plantilla segura.
- Secrets sensibles gestionados mediante GitHub Secrets.
- Aplicación web accesible desde navegador.

---

## Comandos útiles

Actualizar kubeconfig:

```bash
aws eks update-kubeconfig --region us-east-1 --name innovatech-eks
```

Ver nodos:

```bash
kubectl get nodes
```

Ver pods:

```bash
kubectl get pods -n innovatech -o wide
```

Ver servicios:

```bash
kubectl get svc -n innovatech
```

Ver deployments:

```bash
kubectl get deployments -n innovatech
```

Ver PVC:

```bash
kubectl get pvc -n innovatech
```

Ver HPA:

```bash
kubectl get hpa -n innovatech
```

Ver métricas:

```bash
kubectl top nodes
kubectl top pods -n innovatech
```

Ver logs backend ventas:

```bash
kubectl logs deployment/backend-ventas -n innovatech --tail=100
```

Ver logs backend despachos:

```bash
kubectl logs deployment/backend-despachos -n innovatech --tail=100
```

Reiniciar deployment backend ventas:

```bash
kubectl rollout restart deployment/backend-ventas -n innovatech
```

Reiniciar deployment backend despachos:

```bash
kubectl rollout restart deployment/backend-despachos -n innovatech
```

---

## Limpieza de recursos

Para evitar consumo innecesario de créditos en AWS Academy, se puede eliminar la infraestructura con:

```bash
cd infra/terraform
terraform destroy
```

Cuando Terraform pregunte, escribir:

```text
yes
```

También se recomienda verificar en AWS que no queden recursos activos como Load Balancers, instancias EC2 o clusters EKS.
