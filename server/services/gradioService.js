const { Client } = require('@gradio/client');

let gradioClient = null;
let clientConnectionStatus = 'disconnected';

async function initializeGradioClient() {
  try {
    console.log('🔄 Connecting to Gradio client...');
    gradioClient = await Client.connect('Rezuwan/USB_Unmad_Satirical_Bot');
    clientConnectionStatus = 'connected';
    console.log('✅ Gradio client connected successfully');
  } catch (error) {
    clientConnectionStatus = 'failed';
    console.error('❌ Failed to connect to Gradio client:', error.message);
    console.log('⚠️  APIs will return connection error until client is available');
  }
}

async function resetGradioClient() {
  try {
    if (gradioClient) {
      console.log('🔄 Resetting Gradio client connection...');
      gradioClient = await Client.connect('Rezuwan/USB_Unmad_Satirical_Bot');
      clientConnectionStatus = 'connected';
      console.log('✅ Gradio client reset successfully');
    }
  } catch (error) {
    console.error('❌ Failed to reset Gradio client:', error.message);
    await initializeGradioClient();
  }
}

function getClientConnectionStatus() {
  return clientConnectionStatus;
}

function getGradioClient() {
  return gradioClient;
}

function injectDependencies(controllers, NODE_ENV) {
  if (controllers.indexController) {
    controllers.indexController.setClientConnectionStatusGetter(getClientConnectionStatus);
  }
  if (controllers.satiricalBotController) {
    controllers.satiricalBotController.setDependencies({
      getGradioClient,
      clientConnectionStatus: getClientConnectionStatus,
      resetGradioClient,
      NODE_ENV
    });
  }
  if (controllers.lambdaController) {
    controllers.lambdaController.setDependencies({
      getGradioClient,
      clientConnectionStatus: getClientConnectionStatus,
      resetGradioClient,
      NODE_ENV
    });
  }
}

module.exports = {
  getGradioClient,
  getClientConnectionStatus,
  initializeGradioClient,
  resetGradioClient,
  injectDependencies
};
