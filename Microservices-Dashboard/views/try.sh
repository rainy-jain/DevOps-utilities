
if (vClients != "") {
  def gender = binding.variables.get('clients')
  def gender1 = binding.variables.get('chain')
  if (gender == 'avella')
    return ['av']
  else if (gender == 'bilo')
    return ['bl']
  else if ((gender == 'base') && (gender1 == 'pdx'))
    return ['pdx']
  else if (gender == 'gianteagle')
    return ['ge']
  else if (gender == 'family_fare')
    return ['ff']
  else if (gender == 'harveys')
    return ['hv']
  else if (gender == 'fruth')
    return ['fp']
  else if (gender == 'meijer')
    return ['mj']
  else if (gender == 'pharmaca')
    return ['ph']
  else if (gender == 'weis')
    return ['ws']
  else if (gender == 'pavilions')
    return ['pv']
  else if (gender == 'randalls')
    return ['rd']
  else if (gender == 'safeway')
    return ['sw']
  else if (gender == 'tom_thumb')
    return ['tt']
  else if (gender == 'vons')
    return ['vn']
  else if (gender == 'winndixie')
    return ['wd']
  else if ((gender == 'base') && (gender1 == 'mck'))
    return ['mck']
  else if (gender == 'fairview')
    return ['fv']
  else if (gender == 'bannerhealth')
    return ['ba']  
  else if (gender == 'healthspan')
    return ['hs']
  else if (gender == 'henryford')
    return ['hf']
  else if (gender == 'publix')
    return ['pl']
  else if (gender == 'healthfirst')
    return ['hl']
  else if (gender == 'familyfare')
    return ['ff']
  else if (gender == 'dw_freshmarket')
    return ['dw']
  else if (gender == 'familyfresh')
	return ['fa']
  else if (gender == 'foresthills')
	return ['fh']
  else if (gender == 'kmart')
	return ['km']
  else if (gender == 'vgs_grocery')
	return ['vg']

  else if (gender == 'baylor')
    return ['bs']
  else if (gender == 'shopko')
    return ['sp']
  else if (gender == 'target')
    return ['tr']
  else if (gender == 'dartmouth')
    return ['dh']
  else if (gender == 'ochsner')
    return ['oh']
  else if (gender == 'kmart')
    return ['km']
  else if (gender == 'froedtert')
    return ['fr']
  else if (gender == 'getwell')
    return ['gw']
  else if (gender == 'brookshire')
    return ['bb']
  else if (gender == 'meglo')
    return ['mck']
  else if (gender == 'pricechopper')
    return ['pc']
  else if (gender == 'avera')
    return ['ar']
  else if (gender == 'intermountain')
    return ['im']
  else if (gender == 'oxygen' || gender == 'oxygen_pdx' || gender == 'oxygen_mck')
    return ['ox']
  else if (gender == 'jewelosco')
    return ['jo']
  else if (gender == 'acme')
    return ['am']
  else if (gender == 'nebraska')
    return ['nm']
  else if (gender == 'shaws')
    return ['sh']
  else if (gender == 'uvmc')
    return ['uv']
  else if (gender == 'haggen')
    return ['hg']
  else if (gender == 'vanderbilt')
    return ['vb']
  else if (gender == 'pharmacyadvantage')
    return ['pa']
  else if (gender == 'ingles')
    return ['in']
  else if (gender == 'reasors')
    return ['re']
  else if (gender == 'raleys')
    return ['ra']
  else if (gender == 'albertsons')
    return ['ab']
  else if (gender == 'carrs')
    return ['cr']
  else if (gender == 'pavilions')
    return ['pv']
  else if (gender == 'randalls')
    return ['rd']
  else if (gender == 'tomthumb')
    return ['tt']
  else if (gender == 'vons')
    return ['vn']
  else if (gender == 'mscripts-mck')
    return ['mm']
  else if (gender == 'core' || gender == 'corepdx' || gender == 'coremck')
    return ['co']
  else if (gender == 'kelsey_seybold')
    return ['ks']
  else if (gender == 'bi-mart')
    return ['bm']  
  else if (gender == 'geisinger')
    return ['gs'] 
  else if (gender == 'harnesshealth')
    return ['hh']
  
 } else 
    return ['NOT A VALID CLIENT']
  

  if(clients.equals("core"))
return [
'co'
]
else if(DispensingSystem.equals("mscripts_client_data"))
return [
'mscripts_client_data_DEV',
'mscripts_client_data_UAT'
]
else
return [
'base'
]
