import { MedicosService } from './medicos.service';
import{from, EMPTY, throwError}from 'rxjs';
import { MedicosComponent } from './medicos.component';
import { format } from 'url';

describe('Medicos Component testSuit',()=>{
    let component: MedicosComponent;
    const servicio = new MedicosService(null);

    beforeEach(()=>{
        component = new MedicosComponent(servicio);
    })

    // test1
    it('Init: debe de cargar los medicos', ()=>{
        const medicosFake =['medico1', 'medico2','medico3'];
        spyOn(servicio, 'getMedicos').and.callFake(()=>{
            return from([medicosFake])
        })
        component.ngOnInit();
        expect(component.medicos.length).toBeGreaterThan(0);
    })

    // test agregar
  
     it('Debe de llamar al servidior para crear un medico', ()=>{
        
        const espia = spyOn(servicio, 'agregarMedico').and.callFake(medico=>{
            return EMPTY
        })
        component.agregarMedico();
        expect(espia).toHaveBeenCalled();
    })
    // test 3
    it('Debe de agregar un nuevo medico al arreglo del compponente', ()=>{
        const medico ={id:1, nombre: 'enrique'};
        spyOn (servicio, 'agregarMedico').and.returnValue(from([medico]));
        component.agregarMedico();
        expect(component.medicos.length).toBeGreaterThanOrEqual(1);

    })
    // test 4
    it('Si falla la llamada el error debe de ser igual al error del servicio', ()=>{
        const miError = 'no se pudo agregar al medico';
        spyOn(servicio, 'agregarMedico').and.returnValue(throwError(miError));
        component.agregarMedico();
        expect(component.mensajeError).toBe(miError);
    })

    //test 5 debe de llamar al servidor para borrar un medico
    it ('Debe de llamar al servidor para borrar un medico', ()=>{
        const confirmado = spyOn(servicio, 'borrarMedico').and.returnValue(EMPTY);
        component.borrarMedico('1');
        expect(confirmado).toHaveBeenCalledWith('1');
    })
    
    // test 6 no debe llamar al servidor para borrar medico cuando el confirmar sea negativo
    it ('No debe llamar al servidor para borrar un medico cuando el cofirmar sea negativo', ()=>{
       
        const cancelado = spyOn(servicio, 'borrarMedico').and.callFake(medico=>{return EMPTY;});
        component.borrarMedico('2');
        expect(cancelado).not.toHaveBeenCalledWith('2');

    })

})