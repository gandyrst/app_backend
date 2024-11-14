module.exports = {
    apps: [{
      name: 'mi-app',
      script: 'index.js',
      instances: '4',
      exec_mode: 'cluster',
//   Especifica la ruta del archivo donde se guardarán los logs de salida estándar.
      out_file: './logs/output.log',
//   Define la ruta del archivo donde se guardarán los logs de errores.
      error_file: './logs/error.log',
//   Permite habilitar el modo de vigilancia, reiniciando la aplicación automáticamente cuando se detectan cambios en los archivos.
      watch: true,
//   Define un retraso en milisegundos antes de reiniciar la aplicación después de un fallo.
      restart_delay: 5000,
    }]
  };