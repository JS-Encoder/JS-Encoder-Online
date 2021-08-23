import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#1980ff',
        secondary: '#424242',
        accent: '#FF4081',
        error: '#E53935',
        info: '#272727',
        success: '#7CB342',
        warning: '#FFB300',
      }
    }
  }
});
