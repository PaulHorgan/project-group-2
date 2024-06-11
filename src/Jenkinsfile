pipeline {
   agent any
   stages {
       stage('Install') {
           steps {
                bat 'npm install'
           }
       }
    //    stage('Delete') {
    //        steps {
    //        }
    //    }
       stage('Run') {
           steps {
                bat 'pm2 start "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js" -- start'
           }
       }
   }
}