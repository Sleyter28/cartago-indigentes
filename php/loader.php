<?php
include("database.php");
$option = $_GET['id']; // id de la operación que se va a realizar
switch ($option) {
	case 1:
		# se traerá a todos los grupos de trabajo...
		$sql="SELECT idgrupoTrabajo,nombre FROM grupoTrabajo;";
		$result = $conn->query($sql);
		$arraylist = array();
		if ($result->num_rows > 0) {
		    // output data of each row
		    while($row = $result->fetch_assoc()) {
		    	array_push($arraylist,array("idgrupoTrabajo"=>$row["idgrupoTrabajo"],"nombre"=>$row["nombre"]));
		    }
		   	echo json_encode($arraylist);    
		}
		else {
		    echo "0";
		}
		$conn->close();
		break;
	case 2:
		# se traerá a todos los grupos de trabajo...
		
		$arraylist = array();
		$grupo_id= $_GET['grupo'];
		$sql="SELECT idgrupoTrabajo,nombre,resumen FROM grupoTrabajo where idgrupoTrabajo=$grupo_id;";
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
		    // output data of each row
		    
		    while($row = $result->fetch_assoc()) {
		    	$arraylist["idgrupoTrabajo"]=$row["idgrupoTrabajo"];
		    		$arraylist["nombre"]=$row["nombre"];
		    		$arraylist["resumen"]=$row["resumen"];

		    }
		}
			/*
`grupoTrabajo_idgrupoTrabajo``objetivo``idobjetivo`*/
		
		$sql="SELECT idobjetivo,objetivo FROM objetivo where grupoTrabajo_idgrupoTrabajo = $grupo_id;";
		$result = $conn->query($sql);
		$objetivos =array();
		if ($result->num_rows > 0) {
		    // output data of each row
		    
		    while($row = $result->fetch_assoc()) {
		    	array_push($objetivos,array("idobjetivo"=>$row["idobjetivo"],"objetivo"=>$row["objetivo"]));

		    }
		    $arraylist["objetivos"]=$objetivos;

		}
		
		echo json_encode($arraylist);    
		$conn->close();
		break;
	
	default:
		break;
}




?>
