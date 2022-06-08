export default function SaleCard({ sale }) {
return(
  <div>
    <p>
      Pedido
      <span
        data-testid={`customer_orders__element-order-id-${sale.id}`}
      >
        { sale.id }
      </span>
    </p>
    <p
      data-testid={`customer_orders__element-delivery-status-${sale.id}`}
    >
     { sale.status }
    </p>
    <div>
      <p
        data-testid={`customer_orders__element-order-date-${sale.id}`}
      >
      { sale.date }
      </p>
      <p>
      {/* { valorDaCompra } */}
      valorDaCompra
      </p>
    </div>
  </div>
)
}