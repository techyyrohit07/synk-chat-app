


export const ChatAppLayout = ({left, center, right}) => {

    

  return (
    <div className="h-screen  text-white grid grid-cols-[300px_1fr_300px]">
        
      <aside className="border-r border-white/10 backdrop-blur-md bg-white/5 " >{left}</aside>

      <main className=" flex flex-col overflow-hidden">{center}</main>

      <aside className="border-l border-white/10 backdrop-blur-md bg-white/5 ">{right}</aside>

    </div>
  )
}
