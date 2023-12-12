const Valor=(props)=>{
  return(
    <div className="modal-is-open">
      <div className="modal-container">
      {props.valor.map((datos) => (
        <div>
          <div className='row'>{datos.DescropItem}</div>
          <div className='row'>{datos.Valor}</div>
        </div>
      ))}
      </div>
    </div>
  )
}
export default Valor;