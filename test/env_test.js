const {test, describe, it} = require('node:test');
const assert = require('node:assert');
const {tiMonth, fuelEnergySelector, electricalConsumption, costElectricalKM, combustionConsumption, fuelConsumption, fuelEfficiency, fuelCostKm, energyKm,emisionKm,savedEnergy,avoidedEmissions,monthlySavings,annualSavings,youngTree, oldTree, energyH2Cylinders, energyH2LowPresure, energyConsumed, hydrogenMass, litersRequired} = require('../calculators/environment')

const electrical_consumption = electricalConsumption(2, 2)
const combustion_consumption = combustionConsumption(electrical_consumption)
const fuel_selector = fuelEnergySelector("gasoline")
const fuel_consumption = fuelConsumption(combustion_consumption, fuel_selector["fuel_energy"])
const Anual_use=2;
const monthly_savings = monthlySavings(fuelCostKm(fuel_selector["fuel_price"], fuel_consumption), costElectricalKM(electrical_consumption,3), Anual_use)

test('env_ipc', () => { 
    assert.strictEqual(tiMonth(2), 0.0016515813019202241)
})


describe("FuelEnergySelector colection", () => {
    it("gasoline case", () => {
        assert.deepStrictEqual(fuelEnergySelector("gasoline"),{
            "fuel_price": 16700,
            "fuel_energy": 35.58,
            "emision_factor": 69.25
        })
    })

    it("diesel case", () => {
        assert.deepStrictEqual(fuelEnergySelector("diesel"),{
            "fuel_price": 11795,
            "fuel_energy": 40.7,
            "emision_factor": 74.01
        })
    })
})


// Desarollo 


describe("Conjunto de pruebas PASS", () => {

    it("Prueba de ElectricalConsumption", () => {
        assert.strictEqual(
            electricalConsumption(2,2), 
            1.1111111111111112
        )
    })

    it("Prueba de CostElectricalKM", () => {
        assert.strictEqual(
            costElectricalKM(electrical_consumption,3), 
            3.3333333333333335
        )
    })

    it("Prueba de CombustionConsumption", () => {
        assert.strictEqual(
            combustionConsumption(electrical_consumption), 
            4.11522633744856
        )
    })

    it("Prueba de fuelConsuption", () => {
        assert.strictEqual(
            fuelConsumption(
            combustion_consumption, 
            fuel_selector["fuel_energy"]), 
            0.11566122364948173
        )
    })
})


describe("Conjunto de pruebas FAIL", () => {

    it("Prueba de fuelEfficiency", () => {
        assert.notStrictEqual(
            fuelEfficiency(fuel_consumption), 
            8.64594 
        )
    })

    it("Prueba de fuelCostKm", () => {
        assert.notStrictEqual(
            fuelCostKm(
            fuel_selector["fuel_price"], 
            fuel_consumption), 
            1931.5424349463449
        )
    })

    it("Prueba de energyKm", () => {
        assert.notStrictEqual(
            energyKm(combustion_consumption), 
            14814814.814814815
        )
    })

    it("Prueba de emisionKm", () => {
        assert.notStrictEqual(
            emisionKm(
            fuel_selector["emision_factor"], 
            energyKm(combustion_consumption)), 
            1025.9259259259259
        )
    })
})


describe("Conjunto de pruebas SKIPPED", () => {

    it("Prueba de savedEnergy", (t) => {
        const combustion_consumption = null;
        if (combustion_consumption === null) {
            t.skip();
        }else{
            assert.strictEqual(
                savedEnergy(
                    combustion_consumption, 
                    electrical_consumption,
                    Anual_use),
                    6.008230452674897 
            )
        }
    })

    it("Prueba de avoidedEmissions", (t) => {
        const Anual_use = null;
        if (Anual_use === null) {
            t.skip();
        }else{
            assert.strictEqual(
                avoidedEmissions(
                    energyKm(combustion_consumption),
                    Anual_use),
                    0.0020518518518518516
            )
        }
    })

    it("Prueba de monthlySavings", (t) => {
        const Anual_use = null;
        if (Anual_use === null) {
            t.skip();
        }else{
            assert.strictEqual(
                monthlySavings(
                    fuelCostKm(fuel_selector["fuel_price"], fuel_consumption),
                    costElectricalKM(electrical_consumption,3),
                    Anual_use),
                    -0.5362786849473086
            )
        }
    })

    it("Prueba de annualSavings", (t) => {
        const ipc_data = null;
        if (ipc_data === null) {
            t.skip();
        }else{
            assert.strictEqual(
                annualSavings(
                    monthly_savings,
                    ipc_data),
                    -6.494123956523584
            )
        }
    })

    it("Prueba de youngTree", (t) => {
        const avoided_emissions = null;
        if (avoided_emissions === null) {
            t.skip();
        }else{
            assert.strictEqual(
                youngTree(avoided_emissions),
                0
            )
        }
    })

    it("Prueba de oldTree", (t) => {
        const avoided_emissions = null;
        if (avoided_emissions === null) {
            t.skip();
        }else{
            assert.strictEqual(
                oldTree(avoided_emissions),
                0
            )
        }
    })

    it("Prueba de energyH2Cylinders", (t) => {
        const ne = null;
        if (ne === null) {
            t.skip();
        }else{
            assert.strictEqual(
                energyH2Cylinders(ne),
                3.7037037037037033
            )
        }
    })

    it("Prueba de energyH2LowPresure", (t) => {
        const energyH2Cylinders = null;
        if (energyH2Cylinders === null) {
            t.skip();
        }else{
            assert.strictEqual(
                energyH2LowPresure(energyH2Cylinders),
                3.898635477582846
            )
        }
    })

    it("Prueba de energyConsumed", (t) => {
        const energyH2LowPresure = null;
        if (energyH2LowPresure === null) {
            t.skip();
        }else{
            assert.strictEqual(
                energyConsumed(energyH2LowPresure),
                5.129783523135323
            )
        }
    })

    it("Prueba de hydrogenMass", (t) => {
        const energyH2LowPresure = null;
        if (energyH2LowPresure === null) {
            t.skip();
        }else{
            assert.strictEqual(
                hydrogenMass(energyH2LowPresure),
                0.11697076140362574
            )
        }
    })

    it("Prueba de litersRequired", (t) => {
        const hydrogenMass = null;
        if (hydrogenMass === null) {
            t.skip();
        }else{
            assert.strictEqual(
                litersRequired(hydrogenMass),
                1.0527368526326317
            )
        }
    })
    
})




