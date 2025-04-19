# Proyecto: CI/CD con Docker Swarm

Este proyecto implementa una aplicación contenerizada utilizando **Docker Swarm**, **Docker Compose** y un pipeline de **CI/CD**. Además, se aplican estrategias de despliegue como **Rolling Updates** y **Blue-Green Deployment** para garantizar alta disponibilidad, resiliencia y cero tiempo de inactividad durante las actualizaciones.

---

## **Tabla de Contenidos**

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Estructura del Repositorio](#estructura-del-repositorio)
3. [Configuración del Entorno](#configuración-del-entorno)
4. [Despliegue de la Aplicación](#despliegue-de-la-aplicación)
5. [Pipeline CI/CD](#pipeline-cicd)
6. [Estrategias de Despliegue](#estrategias-de-despliegue)
   - [Rolling Updates](#rolling-updates)
   - [Blue-Green Deployment](#blue-green-deployment)
7. [Capturas de Pantalla](#capturas-de-pantalla)
8. [Problemas y Soluciones](#problemas-y-soluciones)

---

## **Descripción del Proyecto**

El objetivo de este proyecto es demostrar cómo integrar herramientas modernas de DevOps, como **Docker Swarm** y **GitHub Actions**, para crear un sistema de despliegue continuo. La aplicación utiliza una interfaz visual animada que simula nodos en un clúster de Docker Swarm y permite interactuar con estrategias de despliegue como **Rolling Updates** y **Blue-Green Deployment**.

---

## **Estructura del Repositorio**

La estructura del repositorio está organizada de la siguiente manera:

```
.
├── docker-compose.yml                # Configuración base para Docker Swarm
├── docker-compose-rolling.yaml       # Configuración para Rolling Updates
├── docker-compose-blue-green.yml     # Configuración para Blue-Green Deployment
├── Dockerfile                        # Archivo para construir la imagen Docker
├── html                              # Carpeta con los archivos de la aplicación web
│   ├── docker-logo.png               # Logotipo de Docker
│   ├── index.html                    # Página principal de la aplicación
│   ├── script.js                     # Lógica interactiva de la aplicación
│   └── styles.css                    # Estilos CSS para la aplicación
├── img                               # Capturas de pantalla y recursos visuales
└── README.md                         # Documentación del proyecto
```

---

## **Configuración del Entorno**

### **Requisitos Previos**
- Docker y Docker Compose instalados.
- Git instalado.
- Cuenta en GitHub para configurar el pipeline CI/CD.

### **Pasos para Configurar Docker Swarm**
1. Inicializa Docker Swarm:
   ```bash
   docker swarm init --advertise-addr 192.168.1.64
   ```
2. Verifica el estado del clúster:
   ```bash
   docker node ls
   ```

---

## **Despliegue de la Aplicación**

### **Paso 1: Clonar el Repositorio**
Clona este repositorio en tu máquina local:
```bash
git clone git@github.com:MamaniVicenteEver/docker-swarm-app.git
cd docker-swarm-app
```

### **Paso 2: Desplegar el Servicio**
Usa Docker Compose para desplegar la aplicación en Docker Swarm:
```bash
docker stack deploy -c docker-compose.yml my-app
```

### **Paso 3: Verificar el Servicio**
Verifica que el servicio esté en ejecución:
```bash
docker service ls
```

Accede a la aplicación en tu navegador:
```
http://192.168.1.64/
```

---

## **Pipeline CI/CD**

El pipeline CI/CD está configurado en **GitHub Actions**. El archivo `.github/workflows/ci-cd.yml` contiene las siguientes etapas:

1. **Checkout del Código**: Descarga el código del repositorio.
2. **Construcción de la Imagen**: Construye la imagen Docker de la aplicación.
3. **Publicación en Docker Hub**: Sube la imagen al registro de Docker Hub.
4. **Actualización del Servicio**: Actualiza el servicio en Docker Swarm.

### **Secretos Requeridos**
Agrega los siguientes secretos en la configuración de GitHub:
- `DOCKER_USERNAME`: Tu nombre de usuario de Docker Hub.
- `DOCKER_PASSWORD`: Tu contraseña de Docker Hub.

---

## **Estrategias de Despliegue**

### **Rolling Updates**
La estrategia de **Rolling Updates** permite actualizar el servicio de forma gradual, minimizando el impacto en los usuarios. Las réplicas se actualizan una por una con un retraso entre cada actualización.

#### **Configuración**
El archivo `docker-compose-rolling.yaml` define la estrategia:
```yaml
update_config:
  parallelism: 1  
  delay: 15s     
  failure_action: rollback
```

#### **Simulación**
Para simular una actualización:
```bash
docker service update --image app-my-nginx:v2 my-rolling-app_app
```

### **Blue-Green Deployment**
La estrategia de **Blue-Green Deployment** permite cambiar entre dos versiones de la aplicación sin interrupción. Una versión (`blue`) está activa mientras la otra (`green`) permanece inactiva.

#### **Configuración**
El archivo `docker-compose-blue-green.yml` define dos servicios:
```yaml
blue:
  image: app-my-nginx:latest
  labels:
    - "traefik.enable=false"  # Inicialmente desactivado

green:
  image: app-my-nginx:latest
  labels:
    - "traefik.enable=true"  # Inicialmente activo
```

#### **Cambiar Versión**
Para cambiar de `green` a `blue`:
```bash
docker service update --label-add "traefik.enable=true" my-bg-app_blue
docker service update --label-add "traefik.enable=false" my-bg-app_green
```

---

## **Capturas de Pantalla**

### **Interfaz de la Aplicación**
![Interfaz Principal](./img/docker-s.gif)  
*Interfaz principal de la aplicación con animaciones y botones interactivos.*

### **Pipeline CI/CD**
![Pipeline CI/CD](./img/github.png)  
*Pipeline CI/CD en GitHub Actions mostrando las etapas completadas.*

### **Redes en Docker Swarm**
![Redes en Docker Swarm](./img/service-s.png)  
*Redes creadas en Docker Swarm usando el driver `overlay`.*

---

## **Problemas y Soluciones**

Durante el desarrollo del proyecto, se encontraron algunos problemas comunes:

1. **Error 404 en Traefik**: Se debió a reglas de enrutamiento incorrectas. Se solucionó asegurando que solo un servicio estuviera activo (`traefik.enable=true`).
2. **Conflictos de Red**: Se resolvieron asegurando que todos los servicios compartieran la misma red overlay (`app-network`).

---

## **Conclusión**

Este proyecto demuestra cómo integrar herramientas modernas de DevOps para crear un sistema de despliegue continuo. La aplicación visualiza conceptos clave como Docker Swarm, CI/CD y estrategias de despliegue, haciendo que el aprendizaje sea interactivo y práctico. Las estrategias de **Rolling Updates** y **Blue-Green Deployment** garantizan alta disponibilidad y permiten cambios seguros en producción.
