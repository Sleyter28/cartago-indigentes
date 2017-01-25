
function cargar(){
	cargarSelectEditGrupo();
	
}

function agregarObjetivo(){
	var divObjetivos=document.getElementById("lista_de_objetivos");
	var max = 10000;
	var min = 15;
	var id=  Math.floor(Math.random()* (max-min+1))+min;
	var dd= document.createElement("dd");
	var input = document.createElement("input");
	input.type="text";
	input.id= id;
	var button=document.createElement("button");
	button.id="button"+id;
	var m= document.createElement("i");
	var attribute = document.createAttribute("class");
	attribute.value = "fa fa-times";
	m.setAttributeNode(attribute);
	var attribute = document.createAttribute("aria-hidden");
	attribute.value = "true";
	m.setAttributeNode(attribute);
	var attribute = document.createAttribute("onclick");
	attribute.value = "borrarObjetivo("+id+")";
	button.setAttributeNode(attribute);
	button.appendChild(m);
	dd.appendChild(input);
	dd.appendChild(button);
	divObjetivos.appendChild(dd);
}
function GuardarCambios(){
	var input_nombre= document.getElementById("nombre_grupo_trabajo");
	var select= document.getElementById("grupos_trabajo");
	var option= select.value;
	var nombre = input_nombre.value;
	var input_resumen = document.getElementById("resumen_grupo_trabajo");
	var resumen = input_resumen.value;
	var lista_de_dd= document.getElementById("lista_de_objetivos").childNodes;
	var lista_de_objetivos= Array(1000);
	for (var i = 0; i < lista_de_dd.length ; i++) {
		var lista_de_inputs=lista_de_dd[i].childNodes;
		for (var j =0; j<lista_de_inputs.length;j++) {
			if(lista_de_inputs[j].tagName.toUpperCase() == "INPUT" ){
				lista_de_objetivos.push(lista_de_inputs[j].value);
			}
		}
		
	}

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	       // Typical action to be performed when the document is ready:
	      	var response= xhttp.responseText; //1 si borro, 2 no borro
	      	if (response=="1") {
	      		alert("Grupo actualizado correctamente");
	      	}else{	
	      		alert("No se pudo actualizar el grupo");
	      	}
	      	
	    }
	  
	};
	var data = new FormData();
	data.append('id', '4');
	data.append('grupo', option);
	data.append('nombre', nombre);
	data.append('resumen', resumen);
	data.append('objetivos', JSON.stringify(lista_de_objetivos));
	xhttp.open("POST","http://ic-itcr.ac.cr/~gubaldo/proyecto/php/loader.php", true);
	xhttp.send(data);
	/*revisar lo de los espacios en blanco, tal vez es necesario cambiar de metodo por post para poder enviar espacios en blanco!**/

}
function EliminarGrupo(){
	var select = document.getElementById("delete_grupo_trabajo");
	var option = select.value;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	       // Typical action to be performed when the document is ready:
	      	var response= xhttp.responseText; //1 si borro, 2 no borro
	      	if (response=="1") {
	      		alert("Grupo correctamente eliminado");
	      		select.remove(select.selectedIndex);
	      		select.selectedIndex="0";
	      	}else{	
	      		alert("No se pudo eliminar el grupo");
	      	}
	      	
	    }
	  
	};
	xhttp.open("GET","http://ic-itcr.ac.cr/~gubaldo/proyecto/php/loader.php?id=3&grupo="+option, true);
	xhttp.send();
	

}

function borrarObjetivo(id){
	var element = document.getElementById(id);
	  element.parentNode.removeChild(element);
	var button = document.getElementById("button"+id);
	  button.parentNode.removeChild(button);
}
function cargarInput(){
	var value= document.getElementById("grupos_trabajo").value;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	       // Typical action to be performed when the document is ready:
	      	var json= xhttp.responseText;
	      	var objs = JSON.parse(json);
	  		var nombre=document.getElementById("nombre_grupo_trabajo");
	  		var resumen=document.getElementById("resumen_grupo_trabajo");
			nombre.value=objs.nombre;
			resumen.value=objs.resumen;
			var divObjetivos=document.getElementById("lista_de_objetivos");
			while (divObjetivos.firstChild) {
				divObjetivos.removeChild(divObjetivos.firstChild);
			}
		  	for (var i= 0; i<objs.objetivos.length; i++) {
		  		/**<dd><input type="text" name="objetivo_grupo_trabajo"><button><i class="fa fa-times" aria-hidden="true"></i></button></dd>*/
		  		var dd= document.createElement("dd");
		  		var input = document.createElement("input");
		  		input.type="text";
		  		input.name= objs.objetivos[i]["idobjetivo"];
		  		input.id= objs.objetivos[i]["idobjetivo"];
		  		var button=document.createElement("button");
		  		button.id="button"+objs.objetivos[i]["idobjetivo"];
		  		var m= document.createElement("i");
		  		var attribute = document.createAttribute("class");
				attribute.value = "fa fa-times";
				m.setAttributeNode(attribute);
				var attribute = document.createAttribute("aria-hidden");
				attribute.value = "true";
				m.setAttributeNode(attribute);
				var attribute = document.createAttribute("onclick");
				attribute.value = "borrarObjetivo("+objs.objetivos[i]["idobjetivo"]+")";
				button.setAttributeNode(attribute);
		  		button.appendChild(m);
		  		input.value=objs.objetivos[i]["objetivo"];
		  		dd.appendChild(input);
		  		dd.appendChild(button);
		  		divObjetivos.appendChild(dd);
		  	}
	      	
	    }
	  
	};
	xhttp.open("GET","http://ic-itcr.ac.cr/~gubaldo/proyecto/php/loader.php?id=2&grupo="+value, true);
	xhttp.send();

}

function cargarSelectEditGrupo(){		
	var select=document.getElementById("grupos_trabajo");
	var select_delete=document.getElementById("delete_grupo_trabajo");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	       // Typical action to be performed when the document is ready:
	      	var json= xhttp.responseText;
	      	var objs = JSON.parse(json);
		  	for (var i= 0; i<objs.length; i++) {
		  		var new_option = document.createElement("option");
		  		var second_new_option =  document.createElement("option");
				new_option.innerHTML= objs[i]["nombre"];
				new_option.value=objs[i]["idgrupoTrabajo"];

				second_new_option.innerHTML= objs[i]["nombre"];
				second_new_option.value=objs[i]["idgrupoTrabajo"];
				select.appendChild(new_option);
				select_delete.appendChild(second_new_option);

		  	}
	      	
	    }
	  
	};
	xhttp.open("GET","http://ic-itcr.ac.cr/~gubaldo/proyecto/php/loader.php?id=1", true);
	xhttp.send();
	
	
}

function cargarActividades(id_select,id_select_to_change){
	var select= document.getElementById(id_select);
	var value_select= select.value;
	var select_to_change=document.getElementById(id_select_to_change);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	       // Typical action to be performed when the document is ready:
	      	var json= xhttp.responseText;
	      	var objs = JSON.parse(json);
		  	for (var i= 0; i<objs.length; i++) {
		  		var new_option = document.createElement("option");
		  		new_option.innerHTML= objs[i]["nombre"];
				new_option.value=objs[i]["idactividad"];
				select_to_change.appendChild(new_option);
				
		  	}
	      	
	    }
	  
	};
	xhttp.open("GET","http://ic-itcr.ac.cr/~gubaldo/proyecto/php/loader.php?id=4&grupo="+value_select, true);
	xhttp.send();
	

}
function cargar_edicion_actividad(){
	var select = document.getElementById("edit_actividad");
	var id_actividad = select.value;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	       // Typical action to be performed when the document is ready:
	      	var json= xhttp.responseText;
	      	var objs = JSON.parse(json);
	      	var titulo_actividad = document.getElementById("titulo_actividad");
			var fecha_actividad = document.getElementById("fecha_actividad");
			var lugar_actividad = document.getElementById("lugar_actividad");
			var descripcion_actividad = document.getElementById("descripcion_actividad");
		  	for (var i= 0; i<objs.length; i++) {
		  		titulo_actividad.value=objs[i]["nombre"];
				fecha_actividad.value=objs[i]["fecha"];
				lugar_actividad.value=objs[i]["lugar"];
				descripcion_actividad.value=objs[i]["descripcion"];
		  	}
	      	
	    }
	  
	};
	xhttp.open("GET","http://ic-itcr.ac.cr/~gubaldo/proyecto/php/loader.php?id=5&actividad="+id_actividad, true);
	xhttp.send();
	

}

function delete_actividad(){
	var select = document.getElementById("delete_actividad");
	var id_actividad = select.value;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	       // Typical action to be performed when the document is ready:
	      	alert("actividad eliminada correctamente");
	      	select.remove(select.selectedIndex);
	      	select.selectedIndex="0";
	    }
	  
	};
	xhttp.open("GET","http://ic-itcr.ac.cr/~gubaldo/proyecto/php/loader.php?id=6&actividad="+id_actividad, true);
	xhttp.send();
	
}