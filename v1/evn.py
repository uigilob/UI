import json

route = "v1/src/"
son = json.loads(render("v1/evn.json"))
tree_r = son['tree_r']
evn = son["evn"]

defult = son['default_export']

export_to = son['export_to']

render("lib/modified_tim.py")
ch_modify =  get_latest_modification_time(int_root+"/"+route)

if ch_modify:
       headers.set(f"last-modified:{ch_modify}")

def import_mdl(method="js",mdls={},parts_=False):
 
 if not parts_:
                for df in defult[method]:
                      df_r = route+df
                      print(render(df_r))
                      print("\n")
 

 for  i in mdls:
     if i in evn: 
           r3 = route+tree_r[i]
           
           if "all" in mdls[i]:
                 for al in evn[i]:
                     try:
                        e2 = r3+str(evn[i][al])+"/"+export_to[method]
                        print(render(e2))
                        print("\n")
                     except:
                           None
                 try:
                    del evn[i]  #ignore all includes next mdlsort
                 except:
                       None
           else:
                
                 for i3 in mdls[i]: 
                     try :
                            e3 = r3+str(evn[i][i3])+"/"+export_to[method]
                            print(render(e3))
                            print("\n")
                            del evn[i][i3] #ignore  maltipal
                     except:
                           None
 


#import_mdl("js",mdls)                  