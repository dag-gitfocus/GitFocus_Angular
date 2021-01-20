pipeline {
    environment {
    registry = "priya2802/gitfocus_service_kube"
    registryCredential = 'GITFocus-DockerHub'
    dockerImage = ''
  }
   agent any	
   stages {
        stage('Initialize'){
            steps {		    
                    nodejs('DAGNodeJS'){
                          sh 'npm install'
                          sh 'cp  index.d.ts ./node_modules/@types/chart.js'
                    }
            }
        }
        stage('Build') {
            steps {
                    nodejs('DAGNodeJS'){
                        sh 'npm run-script build'
                    }
            }
        }
	stage ("Code Analysis") {	   
            steps {	
		    script{
			    def scannerHome = tool 'DAGSonarScanner'
		    }
	            withSonarQubeEnv('SonarQube') {    
	            sh 'pwd'
	            sh 'cp sonar-scanner.properties /var/jenkins_home/sonar-scanner-4.4.0.2170-linux/conf'
		    sh '/var/jenkins_home/sonar-scanner-4.4.0.2170-linux/bin/sonar-scanner'	            		   
		   }
            }
        }
	stage("Quality Check"){
           steps{
	           script{
      			   def qualitygate = waitForQualityGate()
      			   if (qualitygate.status != "OK") {
         		        error "Pipeline aborted due to quality gate coverage failure: ${qualitygate.status}"
			   }
	     	    }
            }
       }
       stage('Building Image') {
            steps {
                   script {
                            dockerImage = docker.build registry + ":$BUILD_NUMBER"
                            //dockerImage = docker.build registry + ":1.1"
                   }
            }           
        }	
        stage('Clean Up'){
            steps {
                sh 'rm -r src output  e2e'
                sh 'rm -f browserslist tsconfig.app.json README.md tsconfig.json angular.json  tsconfig.spec.json karma.conf.js  tslint.json index.d.ts'
            }
        }
	stage('Approval') {            
            steps {
                script {
		    timeout (time: 2, unit: 'MINUTES') {
                    def deploymentDelay = input id: 'Deploy', message: 'Push Image to DockerHub?', submitter: 'admin', parameters: [choice(choices: ['0', '1', '2', '3'], description: 'Hours to delay deployment?', name: 'deploymentDelay')]
                    sleep time: deploymentDelay.toInteger(), unit: 'HOURS'
		    }
                }
            }    
        }
        stage('Push to DockerHub') {
            steps{
                  script {
                            docker.withRegistry( '', registryCredential ) {
                            dockerImage.push()
                           }
                  }
             }
        }
    }
    post {
          always {
		  cleanWs()
	           emailext body:'''${DEFAULT_CONTENT}''',
                            recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                            subject:''' ${DEFAULT_SUBJECT}'''
         }  
   }
}
