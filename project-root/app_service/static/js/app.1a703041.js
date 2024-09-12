(function(){"use strict";var e={4216:function(e,t,o){var n=o(6848),r=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("nav",[t("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" | "),t("router-link",{attrs:{to:"/about"}},[e._v("About")])],1),t("router-view")],1)},s=[],i=o(1656),a={},d=(0,i.A)(a,r,s,!1,null,null,null),l=d.exports,c=o(6178),u=function(){var e=this,t=e._self._c;return t("div",[t("HomePageView")],1)},m=[],v=function(){var e=this,t=e._self._c;return t("div",[t("h1",[e._v("Welcome to Brew Mastery")]),e.isGuest?t("p",[e._v(" You are browsing as a guest. Please login to make orders. ")]):e._e(),e.isUser?t("p",[e._v(" Welcome back, "+e._s(e.user.username)+"! You can browse and place orders. ")]):e._e(),e.isAdmin?t("p",[e._v(" Welcome back, Admin! You have full access to manage users and content. ")]):e._e(),t("ul",[t("li",[t("router-link",{attrs:{to:"/categories"}},[e._v("View Categories")])],1),e.isUser?t("li",[t("router-link",{attrs:{to:"/create-order"}},[e._v("Create Order")])],1):e._e(),e.isUser?t("li",[t("router-link",{attrs:{to:"/orders"}},[e._v("My Orders")])],1):e._e(),e.isAdmin?t("li",[t("router-link",{attrs:{to:"/admin-orders"}},[e._v("Manage All Orders")])],1):e._e(),t("li",[t("router-link",{attrs:{to:"/addons"}},[e._v("View Add-Ons")])],1),e.isAdmin?t("li",[t("router-link",{attrs:{to:"/manage-addons"}},[e._v("Manage Add-Ons")])],1):e._e(),t("li",[t("router-link",{attrs:{to:"/reviews"}},[e._v("View Reviews")])],1),e.isAdmin?t("li",[t("router-link",{attrs:{to:"/manage-reviews"}},[e._v("Manage Reviews")])],1):e._e(),t("li",[t("router-link",{attrs:{to:"/promotions"}},[e._v("View Promotions")])],1),e.isAdmin?t("li",[t("router-link",{attrs:{to:"/manage-promotions"}},[e._v("Manage Promotions")])],1):e._e()]),e.isGuest?t("div",[t("router-link",{staticClass:"btn btn-primary",attrs:{to:"/login"}},[e._v("Log in")])],1):t("div",[t("button",{staticClass:"btn btn-danger",on:{click:e.logout}},[e._v("Log out")])])])},p=[],f=(o(4114),o(4979),{name:"HomePageView",data(){return{user:null}},computed:{isGuest(){return!this.user},isUser(){return this.user&&!this.user.admin},isAdmin(){return this.user&&this.user.admin}},mounted(){const e=this.getCookie("token");if(e){const t=JSON.parse(atob(e.split(".")[1]));this.user=t}},methods:{getCookie(e){const t=`; ${document.cookie}`,o=t.split(`; ${e}=`);if(2===o.length)return o.pop().split(";").shift()},logout(){document.cookie="token=; Max-Age=0; path=/",this.user=null,this.$router.push("/login")}}}),h=f,_=(0,i.A)(h,v,p,!1,null,"4f999dde",null),w=_.exports,g={components:{HomePageView:w}},A=g,b=(0,i.A)(A,u,m,!1,null,null,null),y=b.exports,k=function(){var e=this,t=e._self._c;return t("div",[t("LoginPageView")],1)},P=[],O=function(){var e=this,t=e._self._c;return t("div",{staticClass:"login-container"},[t("h1",[e._v("Login")]),t("form",{on:{submit:function(t){return t.preventDefault(),e.login.apply(null,arguments)}}},[t("div",{staticClass:"mb-3"},[t("label",{staticClass:"form-label",attrs:{for:"username"}},[e._v("Username")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],staticClass:"form-control",attrs:{type:"text",id:"username",required:""},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}})]),t("div",{staticClass:"mb-3"},[t("label",{staticClass:"form-label",attrs:{for:"password"}},[e._v("Password")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password",id:"password",required:""},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),t("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[e._v("Login")]),t("button",{staticClass:"btn btn-secondary",on:{click:e.continueAsGuest}},[e._v(" Continue as Guest ")])])])},C=[],D={name:"LoginPageView",data(){return{username:"",password:""}},methods:{login(){const e={username:this.username,password:this.password};fetch("http://localhost:8001/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((e=>e.json())).then((e=>{e.token?(document.cookie=`token=${e.token}; path=/`,this.$router.push("/")):alert("Invalid credentials")})).catch((e=>console.error("Error:",e)))},continueAsGuest(){this.$router.push("/")}}},x=D,$=(0,i.A)(x,O,C,!1,null,"990f34bc",null),R=$.exports,I={components:{LoginPageView:R}},N=I,S=(0,i.A)(N,k,P,!1,null,null,null),V=S.exports,E=function(){var e=this,t=e._self._c;return t("div",[t("CategoryListView")],1)},q=[],U=function(){var e=this,t=e._self._c;return t("div",[t("h1",[e._v("Categories")]),e.categories.length?t("ul",e._l(e.categories,(function(o){return t("li",{key:o.id},[e._v(" "+e._s(o.name)+" ")])})),0):t("p",[e._v("No categories available")])])},L=[],M=o(3518),B={computed:{...(0,M.aH)({categories:e=>e.categories.categories})},mounted(){this.fetchCategories()},methods:{...(0,M.i0)(["fetchCategories"])}},z=B,T=(0,i.A)(z,U,L,!1,null,null,null),H=T.exports,j={components:{CategoryListView:H}},G=j,J=(0,i.A)(G,E,q,!1,null,null,null),W=J.exports,Y=function(){var e=this,t=e._self._c;return t("div",[t("OrdersListView")],1)},F=[],Q=function(){var e=this,t=e._self._c;return t("div",[t("h2",[e._v("My Orders")]),0===e.orders.length?t("div",[t("p",[e._v("You have no orders yet.")])]):t("ul",e._l(e.orders,(function(o){return t("li",{key:o.id},[t("router-link",{attrs:{to:`/orders/${o.id}`}},[e._v(" Order #"+e._s(o.id)+" - "+e._s(o.status)+" ("+e._s(e.formatDate(o.createdAt))+") ")])],1)})),0)])},K=[],X={data(){return{socket:null}},computed:{...(0,M.aH)({orders:e=>e.orders.orders})},mounted(){this.fetchOrders(),this.socket=new WebSocket("ws://localhost:3000"),this.socket.onmessage=e=>{const t=JSON.parse(e.data);"ORDER_UPDATED"===t.type&&this.fetchOrders()}},methods:{...(0,M.i0)(["fetchOrders"]),formatDate(e){const t={year:"numeric",month:"long",day:"numeric"};return new Date(e).toLocaleDateString(void 0,t)}},beforeDestroy(){this.socket&&this.socket.close()}},Z=X,ee=(0,i.A)(Z,Q,K,!1,null,null,null),te=ee.exports,oe={components:{OrdersListView:te}},ne=oe,re=(0,i.A)(ne,Y,F,!1,null,null,null),se=re.exports,ie=function(){var e=this,t=e._self._c;return t("div",[t("OrderDetailsView")],1)},ae=[],de=function(){var e=this,t=e._self._c;return e.order?t("div",[t("h2",[e._v("Order #"+e._s(e.order.id))]),t("p",[e._v("Status: "+e._s(e.order.status))]),t("p",[e._v("Created At: "+e._s(e.formatDate(e.order.createdAt)))]),t("h3",[e._v("Items:")]),t("ul",e._l(e.order.OrderItems,(function(o){return t("li",{key:o.id},[e._v(" "+e._s(o.Coffee.name)+" - "+e._s(o.quantity)+" x $"+e._s(o.price)+" "),o.Addons.length>0?t("div",[t("p",[e._v("Add-ons:")]),t("ul",e._l(o.Addons,(function(o){return t("li",{key:o.id},[e._v(" "+e._s(o.name)+" - $"+e._s(o.price)+" ")])})),0)]):t("div",[t("p",[e._v("No add-ons for this item.")])])])})),0),t("button",{staticClass:"btn btn-danger",on:{click:e.confirmCancelOrder}},[e._v(" Cancel Order ")])]):e._e()},le=[],ce={name:"OrderDetailsView",computed:{...(0,M.aH)({order:e=>e.orders.order})},mounted(){const e=this.$route.params.id;this.fetchOrderDetails(e)},methods:{...(0,M.i0)(["fetchOrderDetails","cancelOrder"]),confirmCancelOrder(){confirm("Are you sure you want to cancel this order?")&&this.cancelOrder(this.$route.params.id).then((()=>{alert("Order canceled successfully!"),this.$router.push("/orders")})).catch((e=>{console.error("Error canceling order:",e)}))},formatDate(e){const t={year:"numeric",month:"long",day:"numeric"};return new Date(e).toLocaleDateString(void 0,t)}}},ue=ce,me=(0,i.A)(ue,de,le,!1,null,null,null),ve=me.exports,pe={components:{OrderDetailsView:ve}},fe=pe,he=(0,i.A)(fe,ie,ae,!1,null,null,null),_e=he.exports,we=function(){var e=this,t=e._self._c;return t("div",[t("CreateOrderView")],1)},ge=[],Ae=function(){var e=this,t=e._self._c;return t("div",[t("h2",[e._v("Create New Order")]),t("form",{on:{submit:function(t){return t.preventDefault(),e.submitOrder.apply(null,arguments)}}},[e._l(e.orderItems,(function(o,n){return t("div",{key:n},[t("h3",[e._v("Item "+e._s(n+1))]),t("div",[t("label",{attrs:{for:"coffee"}},[e._v("Select Coffee:")]),t("select",{directives:[{name:"model",rawName:"v-model",value:o.selectedCoffeeId,expression:"orderItem.selectedCoffeeId"}],attrs:{id:"coffee",required:""},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(o,"selectedCoffeeId",t.target.multiple?n:n[0])}}},e._l(e.coffees,(function(o){return t("option",{key:o.id,domProps:{value:o.id}},[e._v(" "+e._s(o.name)+" - $"+e._s(o.price)+" ")])})),0)]),t("div",[t("label",{attrs:{for:"quantity"}},[e._v("Quantity:")]),t("input",{directives:[{name:"model",rawName:"v-model",value:o.quantity,expression:"orderItem.quantity"}],attrs:{type:"number",min:"1",id:"quantity",required:""},domProps:{value:o.quantity},on:{input:function(t){t.target.composing||e.$set(o,"quantity",t.target.value)}}})]),t("div",[t("label",{attrs:{for:"addons"}},[e._v("Select Addons:")]),e._l(e.addons,(function(n){return t("div",{key:n.id},[t("input",{directives:[{name:"model",rawName:"v-model",value:o.selectedAddons,expression:"orderItem.selectedAddons"}],attrs:{type:"checkbox"},domProps:{value:n.id,checked:Array.isArray(o.selectedAddons)?e._i(o.selectedAddons,n.id)>-1:o.selectedAddons},on:{change:function(t){var r=o.selectedAddons,s=t.target,i=!!s.checked;if(Array.isArray(r)){var a=n.id,d=e._i(r,a);s.checked?d<0&&e.$set(o,"selectedAddons",r.concat([a])):d>-1&&e.$set(o,"selectedAddons",r.slice(0,d).concat(r.slice(d+1)))}else e.$set(o,"selectedAddons",i)}}}),e._v(" "+e._s(n.name)+" - $"+e._s(n.price)+" ")])}))],2),t("button",{staticClass:"btn btn-danger",on:{click:function(t){return t.preventDefault(),e.removeOrderItem(n)}}},[e._v(" Remove Item ")])])})),t("button",{staticClass:"btn btn-secondary",on:{click:function(t){return t.preventDefault(),e.addOrderItem.apply(null,arguments)}}},[e._v(" Add Another Item ")]),t("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[e._v("Submit Order")])],2)])},be=[],ye={data(){return{orderItems:[{selectedCoffeeId:null,quantity:1,selectedAddons:[]}]}},computed:{...(0,M.aH)({coffees:e=>e.coffees.coffees,addons:e=>e.addons.addons})},mounted(){this.fetchCoffees(),this.fetchAddons()},methods:{...(0,M.i0)({fetchCoffees:"fetchCoffees",fetchAddons:"fetchAddons",placeOrder:"createOrder"}),addOrderItem(){this.orderItems.push({selectedCoffeeId:null,quantity:1,selectedAddons:[]})},removeOrderItem(e){this.orderItems.splice(e,1)},submitOrder(){const e=this.orderItems.every((e=>e.selectedCoffeeId&&e.quantity>0));if(!e)return void alert("Please select a coffee and enter a valid quantity for each item.");const t={status:"pending",coffees:this.orderItems.map((e=>({coffeeId:e.selectedCoffeeId,quantity:e.quantity,price:this.coffees.find((t=>t.id===e.selectedCoffeeId)).price,addons:e.selectedAddons})))};this.placeOrder(t).then((()=>{alert("Order submitted successfully!"),this.$router.push("/orders")})).catch((e=>{console.error("Error submitting order:",e)}))}}},ke=ye,Pe=(0,i.A)(ke,Ae,be,!1,null,null,null),Oe=Pe.exports,Ce={components:{CreateOrderView:Oe}},De=Ce,xe=(0,i.A)(De,we,ge,!1,null,null,null),$e=xe.exports,Re=function(){var e=this,t=e._self._c;return t("div",[t("AdminOrdersView")],1)},Ie=[],Ne=function(){var e=this,t=e._self._c;return t("div",[t("h1",[e._v("All Orders (Admin View)")]),t("table",{staticClass:"table"},[e._m(0),t("tbody",e._l(e.orders,(function(o){return t("tr",{key:o.id},[t("td",[e._v(e._s(o.id))]),t("td",[e._v(e._s(o.status))]),t("td",[e._v(e._s(e.getCustomerName(o.userId)))]),t("td",[e._v(e._s(e.formatDate(o.createdAt)))]),t("td",[t("router-link",{staticClass:"btn btn-primary",attrs:{to:"/orders/"+o.id}},[e._v(" View ")]),t("button",{staticClass:"btn btn-success",on:{click:function(t){return e.updateStatusAction(o.id,"completed")}}},[e._v(" Mark as Completed ")]),t("button",{staticClass:"btn btn-danger",on:{click:function(t){return e.cancelOrder(o.id)}}},[e._v(" Delete ")])],1)])})),0)])])},Se=[function(){var e=this,t=e._self._c;return t("thead",[t("tr",[t("th",[e._v("Order ID")]),t("th",[e._v("Status")]),t("th",[e._v("Customer")]),t("th",[e._v("Date")]),t("th",[e._v("Actions")])])])}],Ve={data(){return{socket:null}},computed:{...(0,M.aH)({orders:e=>e.orders.orders,users:e=>e.users.users})},mounted(){this.fetchAdminOrders(),this.fetchUsers(),this.socket=new WebSocket("ws://localhost:3000"),this.socket.onmessage=e=>{const t=JSON.parse(e.data);"ORDER_UPDATED"===t.type&&this.fetchAdminOrders()}},methods:{...(0,M.i0)(["fetchAdminOrders","fetchUsers","cancelOrder","updateStatus"]),getCustomerName(e){const t=this.users.find((t=>t.id===e));return t?t.username:"Unknown User"},formatDate(e){const t={year:"numeric",month:"long",day:"numeric"};return new Date(e).toLocaleDateString(void 0,t)},updateStatusAction(e,t){e&&t?this.updateStatus({orderId:e,status:t}):console.error("Invalid orderId or status")}},beforeDestroy(){this.socket&&this.socket.close()}},Ee=Ve,qe=(0,i.A)(Ee,Ne,Se,!1,null,null,null),Ue=qe.exports,Le={components:{AdminOrdersView:Ue}},Me=Le,Be=(0,i.A)(Me,Re,Ie,!1,null,null,null),ze=Be.exports,Te=function(){var e=this,t=e._self._c;return t("div",[t("AddOnsView")],1)},He=[],je=function(){var e=this,t=e._self._c;return t("div",[t("h2",[e._v("Available Add-Ons")]),e.addons.length?t("ul",e._l(e.addons,(function(o){return t("li",{key:o.id},[e._v(" "+e._s(o.name)+" - $"+e._s(o.price)+" ")])})),0):t("p",[e._v("No add-ons available.")])])},Ge=[],Je={computed:{...(0,M.aH)({addons:e=>e.addons.addons})},mounted(){this.fetchAddons()},methods:{...(0,M.i0)(["fetchAddons"])}},We=Je,Ye=(0,i.A)(We,je,Ge,!1,null,null,null),Fe=Ye.exports,Qe={components:{AddOnsView:Fe}},Ke=Qe,Xe=(0,i.A)(Ke,Te,He,!1,null,null,null),Ze=Xe.exports,et=function(){var e=this,t=e._self._c;return t("div",[t("ManageAddOnsView")],1)},tt=[],ot=function(){var e=this,t=e._self._c;return t("div",[t("h2",[e._v("Manage Add-Ons")]),e.addons.length?t("ul",e._l(e.addons,(function(o){return t("li",{key:o.id},[e._v(" "+e._s(o.name)+" - $"+e._s(o.price)+" "),t("button",{staticClass:"btn btn-primary",on:{click:function(t){return e.prepareEdit(o)}}},[e._v(" Edit ")]),t("button",{staticClass:"btn btn-danger",on:{click:function(t){return e.removeAddon(o.id)}}},[e._v(" Delete ")])])})),0):e._e(),e.isEditing?e._e():t("form",{on:{submit:function(t){return t.preventDefault(),e.addAddon.apply(null,arguments)}}},[t("h3",[e._v("Add New Add-On")]),t("div",[t("label",{attrs:{for:"name"}},[e._v("Add-On Name:")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.newAddon.name,expression:"newAddon.name"}],attrs:{type:"text",id:"name",required:""},domProps:{value:e.newAddon.name},on:{input:function(t){t.target.composing||e.$set(e.newAddon,"name",t.target.value)}}})]),t("div",[t("label",{attrs:{for:"price"}},[e._v("Price:")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.newAddon.price,expression:"newAddon.price"}],attrs:{type:"number",id:"price",required:""},domProps:{value:e.newAddon.price},on:{input:function(t){t.target.composing||e.$set(e.newAddon,"price",t.target.value)}}})]),t("button",{staticClass:"btn btn-success",attrs:{type:"submit"}},[e._v("Add Add-On")])]),e.isEditing?t("form",{on:{submit:function(t){return t.preventDefault(),e.submitEdit.apply(null,arguments)}}},[t("h3",[e._v("Edit Add-On")]),t("div",[t("label",{attrs:{for:"editName"}},[e._v("Add-On Name:")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.editableAddon.name,expression:"editableAddon.name"}],attrs:{type:"text",id:"editName",required:""},domProps:{value:e.editableAddon.name},on:{input:function(t){t.target.composing||e.$set(e.editableAddon,"name",t.target.value)}}})]),t("div",[t("label",{attrs:{for:"editPrice"}},[e._v("Price:")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.editableAddon.price,expression:"editableAddon.price"}],attrs:{type:"number",id:"editPrice",required:""},domProps:{value:e.editableAddon.price},on:{input:function(t){t.target.composing||e.$set(e.editableAddon,"price",t.target.value)}}})]),t("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[e._v("Save Changes")]),t("button",{staticClass:"btn btn-secondary",on:{click:e.cancelEdit}},[e._v("Cancel")])]):e._e()])},nt=[],rt={name:"ManageAddOnsView",data(){return{newAddon:{name:"",price:0},isEditing:!1,editableAddon:null}},computed:{...(0,M.aH)({addons:e=>e.addons.addons})},mounted(){this.fetchAddons()},methods:{...(0,M.i0)(["fetchAddons","createAddon","deleteAddon","updateAddon"]),addAddon(){this.createAddon(this.newAddon).then((()=>{this.newAddon={name:"",price:0}}))},prepareEdit(e){this.isEditing=!0,this.editableAddon={...e}},cancelEdit(){this.isEditing=!1,this.editableAddon=null},submitEdit(){this.updateAddon(this.editableAddon).then((()=>{this.isEditing=!1,this.editableAddon=null}))},removeAddon(e){this.deleteAddon(e)}}},st=rt,it=(0,i.A)(st,ot,nt,!1,null,null,null),at=it.exports,dt={components:{ManageAddOnsView:at}},lt=dt,ct=(0,i.A)(lt,et,tt,!1,null,null,null),ut=ct.exports,mt=function(){var e=this,t=e._self._c;return t("div",[t("ReviewsListView")],1)},vt=[],pt=function(){var e=this,t=e._self._c;return t("div",[t("h2",[e._v("All Reviews")]),0===e.reviews.length?t("div",[t("p",[e._v("No reviews available yet.")])]):t("ul",e._l(e.reviews,(function(o){return t("li",{key:o.id},[t("strong",[e._v(e._s(e.getCoffeeName(o))+":")]),e._v(" "+e._s(o.comment)+" "),t("div",[e._v("Rating: "+e._s(o.rating)+"/5")]),t("p",[e._v(" By User: "+e._s(e.getUserName(o.userId))+" (Created at: "+e._s(e.formatDate(o.createdAt))+") ")]),e.isUser&&o.userId===e.userId?t("div",[t("button",{on:{click:function(t){return e.editReview(o.id)}}},[e._v("Edit")]),t("button",{on:{click:function(t){return e.deleteReview(o.id)}}},[e._v("Delete")])]):e._e()])})),0),e.isUser?t("div",[t("h3",[e._v("Add a new review")]),t("form",{on:{submit:function(t){return t.preventDefault(),e.submitReview.apply(null,arguments)}}},[t("div",[t("label",{attrs:{for:"coffee"}},[e._v("Select Coffee:")]),t("select",{directives:[{name:"model",rawName:"v-model",value:e.newReview.coffeeId,expression:"newReview.coffeeId"}],attrs:{id:"coffee",required:""},on:{change:function(t){var o=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(e.newReview,"coffeeId",t.target.multiple?o:o[0])}}},e._l(e.coffees,(function(o){return t("option",{key:o.id,domProps:{value:o.id}},[e._v(" "+e._s(o.name)+" ")])})),0)]),t("div",[t("label",{attrs:{for:"rating"}},[e._v("Rating:")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.newReview.rating,expression:"newReview.rating"}],attrs:{type:"number",min:"1",max:"5",id:"rating",required:""},domProps:{value:e.newReview.rating},on:{input:function(t){t.target.composing||e.$set(e.newReview,"rating",t.target.value)}}})]),t("div",[t("label",{attrs:{for:"comment"}},[e._v("Comment:")]),t("textarea",{directives:[{name:"model",rawName:"v-model",value:e.newReview.comment,expression:"newReview.comment"}],attrs:{id:"comment",required:""},domProps:{value:e.newReview.comment},on:{input:function(t){t.target.composing||e.$set(e.newReview,"comment",t.target.value)}}})]),t("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[e._v("Submit Review")])])]):e._e(),e.isGuest?t("div",[t("p",[e._v("You need to log in to post a review.")])]):e._e()])},ft=[],ht={data(){return{newReview:{rating:null,comment:"",coffeeId:null},userId:null}},computed:{...(0,M.aH)({reviews:e=>e.reviews.reviews,coffees:e=>e.coffees.coffees,users:e=>e.users.users}),isUser(){return null!==this.userId},isGuest(){return null===this.userId}},mounted(){this.fetchReviews(),this.fetchCoffees(),this.fetchUsers();const e=this.getCookie("token");if(e){const t=JSON.parse(atob(e.split(".")[1]));this.userId=t.id}},methods:{...(0,M.i0)(["fetchReviews","fetchCoffees","fetchUsers","createReview","deleteReview"]),getCoffeeName(e){if(e.Coffee&&e.Coffee.name)return e.Coffee.name;const t=this.coffees.find((t=>t.id===e.coffeeId));return t?t.name:"Unknown Coffee"},getUserName(e){const t=this.users.find((t=>t.id===e));return t?t.username:"Unknown User"},submitReview(){const e={rating:this.newReview.rating,comment:this.newReview.comment,coffeeId:this.newReview.coffeeId};this.createReview(e)},formatDate(e){const t={year:"numeric",month:"long",day:"numeric"};return new Date(e).toLocaleDateString(void 0,t)},getCookie(e){const t=`; ${document.cookie}`,o=t.split(`; ${e}=`);if(2===o.length)return o.pop().split(";").shift()}}},_t=ht,wt=(0,i.A)(_t,pt,ft,!1,null,null,null),gt=wt.exports,At={components:{ReviewsListView:gt}},bt=At,yt=(0,i.A)(bt,mt,vt,!1,null,null,null),kt=yt.exports,Pt=function(){var e=this,t=e._self._c;return t("div",[t("ManageReviewsView")],1)},Ot=[],Ct=function(){var e=this,t=e._self._c;return t("div",[t("h2",[e._v("Manage Reviews")]),t("ul",e._l(e.reviews,(function(o){return t("li",{key:o.id},[t("strong",[e._v(e._s(o.Coffee?.name||"Unknown Coffee")+":")]),e._v(" "+e._s(o.comment)+" - "),t("button",{on:{click:function(t){return e.removeReview(o.id)}}},[e._v("Delete")])])})),0)])},Dt=[],xt={computed:{...(0,M.aH)({reviews:e=>e.reviews.reviews})},mounted(){this.fetchReviews()},methods:{...(0,M.i0)(["fetchReviews","deleteReview"]),removeReview(e){this.deleteReview(e)}}},$t=xt,Rt=(0,i.A)($t,Ct,Dt,!1,null,null,null),It=Rt.exports,Nt={components:{ManageReviewsView:It}},St=Nt,Vt=(0,i.A)(St,Pt,Ot,!1,null,null,null),Et=Vt.exports,qt=function(){var e=this,t=e._self._c;return t("div",[t("PromotionsListView")],1)},Ut=[],Lt=function(){var e=this,t=e._self._c;return t("div",[t("h2",[e._v("Current Promotions")]),0===e.promotions.length?t("div",[t("p",[e._v("No promotions available at the moment.")])]):t("ul",e._l(e.promotions,(function(o){return t("li",{key:o.name},[t("h3",[e._v(e._s(o.name))]),t("p",[e._v(e._s(o.description))]),t("p",[e._v("Discount: "+e._s(o.discount)+"%")]),t("p",[e._v(" Valid from: "+e._s(e.formatDate(o.startDate))+" to "+e._s(e.formatDate(o.endDate))+" ")])])})),0)])},Mt=[],Bt={name:"PromotionsListView",data(){return{promotions:[]}},mounted(){this.fetchPromotions()},methods:{fetchPromotions(){fetch("http://localhost:3000/promotions").then((e=>e.json())).then((e=>{this.promotions=e})).catch((e=>console.error("Error fetching promotions:",e)))},formatDate(e){const t={year:"numeric",month:"long",day:"numeric"};return new Date(e).toLocaleDateString(void 0,t)}}},zt=Bt,Tt=(0,i.A)(zt,Lt,Mt,!1,null,"725dee22",null),Ht=Tt.exports,jt={components:{PromotionsListView:Ht}},Gt=jt,Jt=(0,i.A)(Gt,qt,Ut,!1,null,null,null),Wt=Jt.exports,Yt=function(){var e=this,t=e._self._c;return t("div",[t("ManagePromotionsView")],1)},Ft=[],Qt=function(){var e=this,t=e._self._c;return t("div",[t("h2",[e._v("Manage Promotions")]),t("h3",[e._v("Add New Promotion")]),t("form",{on:{submit:function(t){return t.preventDefault(),e.submitPromotion.apply(null,arguments)}}},[t("div",[t("label",{attrs:{for:"name"}},[e._v("Promotion Name:")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.newPromotion.name,expression:"newPromotion.name"}],attrs:{id:"name",required:""},domProps:{value:e.newPromotion.name},on:{input:function(t){t.target.composing||e.$set(e.newPromotion,"name",t.target.value)}}})]),t("div",[t("label",{attrs:{for:"description"}},[e._v("Description:")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.newPromotion.description,expression:"newPromotion.description"}],attrs:{id:"description",required:""},domProps:{value:e.newPromotion.description},on:{input:function(t){t.target.composing||e.$set(e.newPromotion,"description",t.target.value)}}})]),t("div",[t("label",{attrs:{for:"discount"}},[e._v("Discount (%):")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.newPromotion.discount,expression:"newPromotion.discount"}],attrs:{type:"number",id:"discount",min:"1",max:"100",required:""},domProps:{value:e.newPromotion.discount},on:{input:function(t){t.target.composing||e.$set(e.newPromotion,"discount",t.target.value)}}})]),t("div",[t("label",{attrs:{for:"startDate"}},[e._v("Start Date:")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.newPromotion.startDate,expression:"newPromotion.startDate"}],attrs:{type:"date",id:"startDate",required:""},domProps:{value:e.newPromotion.startDate},on:{input:function(t){t.target.composing||e.$set(e.newPromotion,"startDate",t.target.value)}}})]),t("div",[t("label",{attrs:{for:"endDate"}},[e._v("End Date:")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.newPromotion.endDate,expression:"newPromotion.endDate"}],attrs:{type:"date",id:"endDate",required:""},domProps:{value:e.newPromotion.endDate},on:{input:function(t){t.target.composing||e.$set(e.newPromotion,"endDate",t.target.value)}}})]),t("button",{attrs:{type:"submit"}},[e._v("Add Promotion")])]),t("h3",[e._v("Existing Promotions")]),0===e.promotions.length?t("div",[t("p",[e._v("No promotions available.")])]):t("ul",e._l(e.promotions,(function(o){return t("li",{key:o.id},[t("h4",[e._v(e._s(o.name))]),t("p",[e._v(e._s(o.description)+" - "+e._s(o.discount)+"% off")]),t("p",[e._v(" Valid from: "+e._s(e.formatDate(o.startDate))+" to "+e._s(e.formatDate(o.endDate))+" ")]),t("button",{on:{click:function(t){return e.editPromotion(o)}}},[e._v("Edit")]),t("button",{on:{click:function(t){return e.deletePromotion(o.id)}}},[e._v("Delete")])])})),0)])},Kt=[],Xt={data(){return{newPromotion:{name:"",description:"",discount:0,startDate:"",endDate:""},editingPromotion:null}},computed:{...(0,M.aH)({promotions:e=>e.promotions.promotions})},mounted(){this.fetchPromotions()},methods:{...(0,M.i0)(["fetchPromotions","createPromotion","deletePromotion"]),submitPromotion(){const e=this.editingPromotion?"updatePromotion":"createPromotion";this[e](this.newPromotion).then((()=>{this.resetForm()}))},editPromotion(e){this.editingPromotion=e,this.newPromotion={...e}},deletePromotion(e){this.deletePromotion(e)},resetForm(){this.newPromotion={name:"",description:"",discount:0,startDate:"",endDate:""},this.editingPromotion=null},formatDate(e){const t={year:"numeric",month:"long",day:"numeric"};return new Date(e).toLocaleDateString(void 0,t)}}},Zt=Xt,eo=(0,i.A)(Zt,Qt,Kt,!1,null,null,null),to=eo.exports,oo={components:{ManagePromotionsView:to}},no=oo,ro=(0,i.A)(no,Yt,Ft,!1,null,null,null),so=ro.exports;n.Ay.use(c.Ay);const io=[{path:"/",component:y},{path:"/login",component:V},{path:"/categories",component:W},{path:"/orders",component:se},{path:"/orders/:id",component:_e},{path:"/create-order",component:$e},{path:"/admin-orders",meta:{requiresAdmin:!0},component:ze},{path:"/addons",component:Ze},{path:"/manage-addons",meta:{requiresAdmin:!0},component:ut},{path:"/reviews",component:kt},{path:"/manage-reviews",meta:{requiresAdmin:!0},component:Et},{path:"/promotions",component:Wt},{path:"/manage-promotions",component:so,meta:{requiresAdmin:!0}}],ao=new c.Ay({mode:"history",routes:io});var lo=ao,co=o(4373);const uo={orders:[],order:null},mo={getAllOrders:e=>e.orders},vo={setOrders(e,t){e.orders=t},setOrder(e,t){e.order=t},addOrder(e,t){e.orders.push(t)},SET_ORDER_STATUS(e,{orderId:t,status:o}){const n=e.orders.find((e=>e.id===t));n&&(n.status=o)}},po={async fetchOrders({commit:e}){const t=document.cookie.split("token=")[1],o=await co.A.get("http://localhost:3000/orders",{headers:{Authorization:`Bearer ${t}`}}),n=JSON.parse(atob(t.split(".")[1])),r=o.data.filter((e=>e.userId===n.id));e("setOrders",r)},async fetchAdminOrders({commit:e}){const t=document.cookie.split("token=")[1],o=await co.A.get("http://localhost:3000/orders",{headers:{Authorization:`Bearer ${t}`}});e("setOrders",o.data)},async fetchOrderDetails({commit:e},t){const o=document.cookie.split(";").find((e=>e.includes("token"))).split("=")[1],n=await co.A.get(`http://localhost:3000/orders/${t}`,{headers:{Authorization:`Bearer ${o}`}});e("setOrder",n.data)},async cancelOrder({dispatch:e},t){const o=document.cookie.split(";").find((e=>e.includes("token"))).split("=")[1];await co.A.delete(`http://localhost:3000/orders/${t}`,{headers:{Authorization:`Bearer ${o}`}}),e("fetchOrders")},async createOrder({commit:e},t){const o=document.cookie.split("token=")[1],n=await co.A.post("http://localhost:3000/orders",t,{headers:{Authorization:`Bearer ${o}`}});e("addOrder",n.data)},async updateStatus({commit:e},{orderId:t,status:o}){const n=document.cookie.split("token=")[1];try{await co.A.put(`http://localhost:3000/orders/${t}`,{status:o},{headers:{Authorization:`Bearer ${n}`}}),e("SET_ORDER_STATUS",{orderId:t,status:o})}catch(r){console.error("Error updating status:",r)}}};var fo={state:uo,getters:mo,mutations:vo,actions:po};const ho={addons:[]},_o={allAddons:e=>e.addons},wo={async fetchAddons({commit:e}){const t=await co.A.get("http://localhost:3000/addons");e("setAddons",t.data)},async createAddon({commit:e},t){const o=document.cookie.split("token=")[1],n=await co.A.post("http://localhost:3000/addons",t,{headers:{Authorization:`Bearer ${o}`}});e("addAddon",n.data)},async deleteAddon({commit:e},t){const o=document.cookie.split("token=")[1];await co.A.delete(`http://localhost:3000/addons/${t}`,{headers:{Authorization:`Bearer ${o}`}}),e("removeAddon",t)},async updateAddon({commit:e},t){const o=document.cookie.split("token=")[1];try{const n=await co.A.put(`http://localhost:3000/addons/${t.id}`,{name:t.name,price:t.price},{headers:{Authorization:`Bearer ${o}`}});e("updateAddon",n.data)}catch(n){throw console.error("Error updating addon:",n),n}}},go={setAddons:(e,t)=>e.addons=t,addAddon:(e,t)=>e.addons.push(t),removeAddon:(e,t)=>{e.addons=e.addons.filter((e=>e.id!==t))},updateAddon:(e,t)=>{const o=e.addons.findIndex((e=>e.id===t.id));-1!==o&&e.addons.splice(o,1,t)}};var Ao={state:ho,getters:_o,actions:wo,mutations:go};const bo={reviews:[]},yo={allReviews:e=>e.reviews},ko={async fetchReviews({commit:e}){const t=await co.A.get("http://localhost:3000/reviews");e("setReviews",t.data)},async createReview({commit:e},t){const o=document.cookie.split("token=")[1],n=await co.A.post("http://localhost:3000/reviews",t,{headers:{Authorization:`Bearer ${o}`}});e("addReview",n.data)},async deleteReview({commit:e},t){const o=document.cookie.split("token=")[1];if(!o)throw new Error("No authentication token found.");try{await co.A.delete(`http://localhost:3000/reviews/${t}`,{headers:{Authorization:`Bearer ${o}`}}),e("removeReview",t)}catch(n){console.error("Error deleting review:",n.response||n.message)}}},Po={setReviews:(e,t)=>e.reviews=t,addReview:(e,t)=>e.reviews.push(t),removeReview:(e,t)=>{e.reviews=e.reviews.filter((e=>e.id!==t))}};var Oo={state:bo,getters:yo,actions:ko,mutations:Po};const Co={promotions:[]},Do={allPromotions:e=>e.promotions},xo={async fetchPromotions({commit:e}){const t=await co.A.get("http://localhost:3000/promotions");e("setPromotions",t.data)},async createPromotion({commit:e},t){const o=document.cookie.split("token=")[1],n=await co.A.post("http://localhost:3000/promotions",t,{headers:{Authorization:`Bearer ${o}`}});e("addPromotion",n.data)},async updatePromotion({commit:e},t){const o=document.cookie.split("token=")[1],n=await co.A.put(`http://localhost:3000/promotions/${t.id}`,t,{headers:{Authorization:`Bearer ${o}`}});e("updatePromotion",n.data)},async deletePromotion({commit:e},t){const o=document.cookie.split("token=")[1];await co.A.delete(`http://localhost:3000/promotions/${t}`,{headers:{Authorization:`Bearer ${o}`}}),e("removePromotion",t)}},$o={setPromotions:(e,t)=>e.promotions=t,addPromotion:(e,t)=>e.promotions.push(t),updatePromotion:(e,t)=>{const o=e.promotions.findIndex((e=>e.id===t.id));-1!==o&&e.promotions.splice(o,1,t)},removePromotion:(e,t)=>{e.promotions=e.promotions.filter((e=>e.id!==t))}};var Ro={state:Co,getters:Do,actions:xo,mutations:$o};const Io={users:[]},No={setUsers(e,t){e.users=t}},So={async fetchUsers({commit:e}){const t=document.cookie.split(";").find((e=>e.includes("token"))).split("=")[1],o=await co.A.get("http://localhost:8001/auth/users",{headers:{Authorization:`Bearer ${t}`}});e("setUsers",o.data)}};var Vo={state:Io,mutations:No,actions:So};const Eo={categories:[]},qo={allCategories:e=>e.categories},Uo={async fetchCategories({commit:e}){try{const t=await co.A.get("http://localhost:3000/categories");e("setCategories",t.data)}catch(t){console.error("Error fetching categories:",t)}}},Lo={setCategories:(e,t)=>e.categories=t};var Mo={state:Eo,getters:qo,actions:Uo,mutations:Lo};const Bo={coffees:[]},zo={allCoffees:e=>e.coffees},To={async fetchCoffees({commit:e}){try{const t=await co.A.get("http://localhost:3000/coffees");e("setCoffees",t.data)}catch(t){console.error("Error fetching coffees:",t)}}},Ho={setCoffees:(e,t)=>e.coffees=t};var jo={state:Bo,getters:zo,actions:To,mutations:Ho};n.Ay.use(M.Ay);var Go=new M.Ay.Store({modules:{orders:fo,addons:Ao,reviews:Oo,promotions:Ro,users:Vo,categories:Mo,coffees:jo}});n.Ay.config.productionTip=!1;const Jo=document.cookie.split("token=")[1];Jo&&(co.A.defaults.headers.common["Authorization"]=`Bearer ${Jo}`),new n.Ay({router:lo,store:Go,render:e=>e(l)}).$mount("#app")}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var s=t[n]={exports:{}};return e[n].call(s.exports,s,s.exports,o),s.exports}o.m=e,function(){var e=[];o.O=function(t,n,r,s){if(!n){var i=1/0;for(c=0;c<e.length;c++){n=e[c][0],r=e[c][1],s=e[c][2];for(var a=!0,d=0;d<n.length;d++)(!1&s||i>=s)&&Object.keys(o.O).every((function(e){return o.O[e](n[d])}))?n.splice(d--,1):(a=!1,s<i&&(i=s));if(a){e.splice(c--,1);var l=r();void 0!==l&&(t=l)}}return t}s=s||0;for(var c=e.length;c>0&&e[c-1][2]>s;c--)e[c]=e[c-1];e[c]=[n,r,s]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};o.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,s,i=n[0],a=n[1],d=n[2],l=0;if(i.some((function(t){return 0!==e[t]}))){for(r in a)o.o(a,r)&&(o.m[r]=a[r]);if(d)var c=d(o)}for(t&&t(n);l<i.length;l++)s=i[l],o.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return o.O(c)},n=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=o.O(void 0,[504],(function(){return o(4216)}));n=o.O(n)})();
//# sourceMappingURL=app.1a703041.js.map