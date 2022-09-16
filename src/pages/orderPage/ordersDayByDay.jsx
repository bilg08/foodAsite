import { Accordion, AccordionSummary, CircularProgress, Grid } from "@mui/material";

export const NewOrdersDayByDay = () => {
    const OrdersDayByDayContainer = styled(Grid)(({ theme }) => ({
      display: "flex",
      gap: `10px`,
      overflow: `scroll`,
      background: "red",
    }));
    const OrderByDayHeader = styled(Grid)(({ theme }) => ({
      background: "darkblue",
      width: `auto`,
      height: `48px`,
      background: ` #FFFFFF`,
      border: `1px solid #DFE0EB`,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      color: `#A0A2A8`,
    }));
    return (
        <OrdersDayByDayContainer item>
            <h1>Ирсэн захиалга </h1>
            {ordersByDay.length <= 0 ? (
              <CircularProgress />
            ) : (
              ordersByDay.map((order, index) => {
                return (
                  <OrderByDay item>
                    <OrderByDayHeader>
                      <p style={{ color: "black", fontSize: `16px` }}>
                        {order.date}
                      </p>
                      <Badge badgeContent={order.orders.length} color="primary">
                        <InventoryIcon />
                      </Badge>
                    </OrderByDayHeader>

                    {order.orders.map((oneOrder, oneOrderIndex) => {
                      return (
                        <Accordion sx={{ width: `100%` }}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography
                              sx={{
                                display: "flex",
                                width: `100%`,
                                justifyContent: `space-around`,
                              }}
                            >
                              <p>{oneOrder.uid}</p>
                              <p>{oneOrder.when}</p>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: `100%`,
                              }}
                            >
                              {oneOrder.orderedFoods.map((orderedFood) => {
                                return (
                                  <ul
                                    sx={{
                                      display: "flex",
                                    }}
                                  >
                                    <li>
                                      {Object.keys(orderedFood)}:
                                      {Object.values(orderedFood)}
                                    </li>
                                  </ul>
                                );
                              })}
                            </Typography>
                            <Typography sx={{ display: "flex", width: `100%` }}>
                              <p>{oneOrder.destination}</p>
                            </Typography>
                          </AccordionDetails>
                          <Select
                            value={orderType}
                            onChange={(e) =>
                              handleChange(
                                e,
                                order.date,
                                oneOrder.uid,
                                order,
                                oneOrderIndex
                              )
                            }
                          >
                            <MenuItem
                              value="Хүргэгдээгүй"
                              sx={{
                                width: `108px`,
                                background: " #66B60F",
                                borderRadius: `10px`,
                                color: "white",
                                height: `32px`,
                              }}
                            >
                              Хүргэгдээгүй
                            </MenuItem>
                            <MenuItem
                              value="Хүргэгдсэн"
                              sx={{
                                width: `108px`,
                                background: " #66B60F",
                                borderRadius: `10px`,
                                color: "white",
                                height: `32px`,
                              }}
                            >
                              Хүргэгдсэн
                            </MenuItem>
                          </Select>
                        </Accordion>
                      );
                    })}
                  </OrderByDay>
                );
              })
            )}
          </OrdersDayByDayContainer>
    )
}