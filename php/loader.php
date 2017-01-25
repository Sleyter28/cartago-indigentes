<?php
include("database.php");
	if (isset($_GET['id'])) {
		$option_get = $_GET['id']; // id de la operación que se va a realizar
		switch ($option_get) {
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
			grupoTrabajo_idgrupoTrabajoobjetivoidobjetivo*/
				
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
			case 3:
				# se traerá a todos los grupos de trabajo...
				
				$arraylist = array();
				$grupo_id= $_GET['grupo'];
				$retorno=0;
				$sql="DELETE FROM objetivo where grupoTrabajo_idgrupoTrabajo = $grupo_id;";
				if ($result = $conn->query($sql)) {
					$retorno =1;
				}
				
				$sql="DELETE FROM grupoTrabajo where idgrupoTrabajo=$grupo_id;";
				if ($result = $conn->query($sql)) {
					$retorno =1;
				}
				echo $retorno;    
				$conn->close();
				break;
			case 4:
				# se traerá a todos las actividades del grupo de trabajo indicado con el id... idactividad, nombre, fecha, lugar, descripcion, rutaImagen, grupoTrabajo_idgrupoTrabajo
				
				$arraylist = array();
				$grupo_id= $_GET['grupo'];
				$sql="SELECT * FROM actividad where grupoTrabajo_idgrupoTrabajo = $grupo_id;";
				$result = $conn->query($sql);
				if ($result->num_rows > 0) {
				    // output data of each row
				    
				    while($row = $result->fetch_assoc()) {
				    	array_push($arraylist,array("idactividad"=>$row["idactividad"],"nombre"=>$row["nombre"]));

				    }

				}
				
				echo json_encode($arraylist);    
				$conn->close();
				break;

			default:
				break;
			}
	}
	else{// si no está seteado el $_GET quiere decir que estaré usando POST
		$option_post = $_POST['id']; // id de la operación que se va a realizar
		switch ($option_post) {
			case 4:
				# se traerá a todos los grupos de trabajo...
				
				$arraylist = array();
				$grupo_id= $_POST['grupo'];
				$objetivos= json_decode($_POST['objetivos']);
				$nombre = $_POST['nombre'];
				$resumen = $_POST['resumen'];
				$retorno=0;
				$sql="UPDATE grupoTrabajo SET nombre='$nombre',resumen='$resumen' WHERE idgrupoTrabajo= $grupo_id;";
				$result = $conn->query($sql);
				$retorno =1;
				$sql="DELETE FROM objetivo WHERE grupoTrabajo_idgrupoTrabajo=$grupo_id;";
				$result = $conn->query($sql);
				foreach ($objetivos as $objetivo) {
					if (strlen($objetivo)>0) {
					$sql="INSERT INTO objetivo( objetivo, grupoTrabajo_idgrupoTrabajo) VALUES ('$objetivo',$grupo_id);";
					$result = $conn->query($sql);
					}
				}
				echo $retorno;    
				$conn->close();
				break;
				/*
					INSERT INTO `actividad`(`idactividad`, `nombre`, `fecha`, `lugar`, `descripcion`, `rutaImagen`, `grupoTrabajo_idgrupoTrabajo`) VALUES (7.8.10.11
				**/
			default:
				# code...
				break;
		}
		}




?>
