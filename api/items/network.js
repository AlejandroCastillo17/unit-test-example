const { Router } = require('express');
const response = require('../../network/response')
const router = Router();
const ctrl = require('./index');
const {tiMonth, fuelEnergySelector, electricalConsumption, costElectricalKM, combustionConsumption, fuelConsumption, fuelEfficiency, fuelCostKm, energyKm,emisionKm,savedEnergy,avoidedEmissions,monthlySavings,annualSavings,youngTree, oldTree, energyH2Cylinders, energyH2LowPresure, energyConsumed, hydrogenMass, litersRequired} = require('../../calculators/environment')
const { areaCirculo } = require('../../calculators/calculo1')
const tableInjected = 'my_table'

router.get('/Prueba/:ipc/:cmb/:ne/:an', (req, res) => {
    try {
        const annual_use=2;
        const ipc= tiMonth(parseFloat(req.params.ipc))
        const FuEnSe = fuelEnergySelector(req.params.cmb)
        const ElCo= electricalConsumption(parseFloat(req.params.ne),parseFloat(req.params.an))
        const CoElKm = costElectricalKM(ElCo,3);
        const CoCo =combustionConsumption(ElCo);
        const FuCo= fuelConsumption(CoCo,FuEnSe.fuel_energy)
        const FuEf=fuelEfficiency(FuCo);
        const FuCos=fuelCostKm(FuEnSe.fuel_price,FuCo)
        const EnKm=energyKm(CoCo);
        const EmKm=emisionKm(FuEnSe.emision_factor,EnKm);
        const SaEn=savedEnergy(CoCo,ElCo,annual_use);
        const AvEm=avoidedEmissions(EmKm,annual_use);
        const MoSa=monthlySavings(FuCo,CoElKm,annual_use);
        const AnSa=annualSavings(MoSa,ipc);
        const YoTr=youngTree(AvEm);
        const OlTr=oldTree(AvEm);
        const EnLi=energyH2Cylinders(req.params.ne);
        const EnLo=energyH2LowPresure(EnLi);
        const En_Co=energyConsumed(EnLo);
        const HyMa=hydrogenMass(EnLo);
        const LiRe=litersRequired(HyMa);
  


        let list ={}
        list["it_Month"]=ipc
        list["fuel_energy_selector"]=FuEnSe;
        list["electrical_consopcion"]=ElCo;
        list["costElectricalKM"]=CoElKm;
        list["combustionConsumption"]=CoCo;
        list["fuelConsumption"] = FuCo;
        list["fuelEfficiency"] = FuEf;
        list["fuelCostKm"] = FuCos;
        list["energyKm"]=EnKm;
        list["emisionKm"]=EmKm;
        list["savedEnergy"]=SaEn;
        list["avoidedEmissions"]=AvEm;
        list["monthlySavings"] = MoSa;
        list["annualSavings"]=AnSa;
        list["youngTree"]=YoTr;
        list["oldTree"]=OlTr;
        list["energyH2Cylinders"]=EnLi;
        list["energyH2LowPresure"]=EnLo;
        list["energyConsumed"]=En_Co;
        list["hydrogenMass"]=HyMa;
        list["litersRequired"]=LiRe;

        console.log("networkj:",YoTr)

        response.success(req, res,list, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
    

   
})

router.get('/Prueba', (req, res) => {
    try {
        response.success(req,res,"Entraste",200)
    }
     catch(error) {
        response.error(req, res,error.message,500)
    }
})

module.exports = router ;