import { useEffect, useState } from "react";
import { useZxing } from "react-zxing";

export const BarcodeScanner = () => {
  const [result, setResult] = useState("");
  const [data, setData] = useState("");

  
  
  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
    },
  });

  

  useEffect(() => {
      var  nombre = ''
      var  apellido = ''
      var  dni = ''
      var  sexo = ''
      var  fechaNac = ''
      let data = result.split('@');
      console.log(data);
      if( data.length == 8 ||  data.length == 9 ) {
        // Formato nuevo
        apellido = data[1].trim()
        nombre   = data[2].trim()
        sexo     = data[3].trim()
        dni      = data[4].trim()
        fechaNac = data[6].trim()
    
      } else if (data.length == 15) {
        // Formato anterior
        apellido = data[4].trim()
        nombre   = data[5].trim()
        sexo     = data[8].trim()
        dni      = data[1].trim()
        fechaNac = data[7].trim()
      } else {
        // Formato NO identificado
        
        return;
      }
      setData({apellido, nombre, dni, fechaNac })
  

  }, [result])
  

  return (
    <div style={{textAlign: "center"}}>
      <video width={300} ref={ref} /> <br />
      {data != null &&
        <ul style={{textAlign: "left"}}>
          <li>Nombre: { data.nombre } </li>
          <li>Apellido: { data.apellido } </li>
          <li>Dni: { data.dni } </li>
          <li>Fecha Nac.: { data.fechaNac } </li>
      </ul>
      }

    </div>
  );
};
