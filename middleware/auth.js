import axios from '@nuxtjs/axios';
export default function(context){
  context.token = localStorage.getItem("token");
}
