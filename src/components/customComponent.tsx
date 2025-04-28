import { PortableTextComponents } from "@portabletext/react";


export const components: PortableTextComponents={
     block:{
        h4:({children})=> <h4 className="text-3xl font-bold text-accentDarkPrimary">{children}</h4>
        
     }
}
