const pixelId = import.meta.env.VITE_META_PIXEL_ID;
const googleId = import.meta.env.VITE_GOOGLE_TAG_ID;
let initialized = false;
const sent = new Set();
export function initTracking(){
 if(initialized)return; initialized=true;
 if(pixelId){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');window.fbq('init',pixelId);}
 if(googleId){window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};const s=document.createElement('script');s.async=true;s.src=`https://www.googletagmanager.com/gtag/js?id=${googleId}`;document.head.appendChild(s);window.gtag('js',new Date());window.gtag('config',googleId);}
}
export function track(event, data={}, onceKey){ if(onceKey){if(sent.has(onceKey))return;sent.add(onceKey);} if(pixelId&&window.fbq){const map={PageView:'PageView',ViewContent:'ViewContent',AddToCart:'AddToCart',InitiateCheckout:'InitiateCheckout',Lead:'Lead',Purchase:'Purchase'};window.fbq('track',map[event]||event,data);}
 const ads={Lead:import.meta.env.VITE_GOOGLE_ADS_LEAD_CONVERSION_ID,AddToCart:import.meta.env.VITE_GOOGLE_ADS_CART_CONVERSION_ID,InitiateCheckout:import.meta.env.VITE_GOOGLE_ADS_CHECKOUT_CONVERSION_ID,Purchase:import.meta.env.VITE_GOOGLE_ADS_PURCHASE_CONVERSION_ID}; if(googleId&&window.gtag){if(event==='PageView')window.gtag('event','page_view');else {window.gtag('event',event==='InitiateCheckout'?'begin_checkout':event==='Lead'?'generate_lead':event==='Purchase'?'purchase':event==='AddToCart'?'add_to_cart':event,data);if(ads[event])window.gtag('event','conversion',{send_to:ads[event],value:data.value,currency:data.currency||'INR'});}}
}
