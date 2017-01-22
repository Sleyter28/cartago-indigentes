
function cargar(){
	cargarSelectEditGrupo();
	
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
		  	for (var i= 0; i<objs.objetivos.length; i++) {
		  		/**<dd><input type="text" name="objetivo_grupo_trabajo"><button><i class="fa fa-times" aria-hidden="true"></i></button></dd>*/
		  		var dd= document.createElement("dd");
		  		var input = document.createElement("input");
		  		input.type="text";
		  		input.name= objs.objetivos[i]["idobjetivo"];
		  		var button=document.createElement("button");
		  		var m= document.createElement("i");
		  		var attribute = document.createAttribute("class");
				attribute.value = "fa fa-times";
				m.setAttributeNode(attribute);
				var attribute = document.createAttribute("aria-hidden");
				attribute.value = "true";
				m.setAttributeNode(attribute);
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
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	       // Typical action to be performed when the document is ready:
	      	var json= xhttp.responseText;
	      	var objs = JSON.parse(json);
		  	for (var i= 0; i<objs.length; i++) {
		  		var new_option = document.createElement("option");
				new_option.innerHTML= objs[i]["nombre"];
				new_option.value=objs[i]["idgrupoTrabajo"];
				select.appendChild(new_option);

		  	}
	      	
	    }
	  
	};
	xhttp.open("GET","http://ic-itcr.ac.cr/~gubaldo/proyecto/php/loader.php?id=1", true);
	xhttp.send();
	
	
}
