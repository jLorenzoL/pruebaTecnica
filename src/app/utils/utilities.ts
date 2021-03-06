import Swal from "sweetalert2";


export function generateConfirmStructure(opcion: number) {
    switch (opcion) {
        case 1: {
            return {
                title: 'Está Seguro?',
                text: "Se Registrará la información",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Registrar'
            };
        }
        case 2: {
            return {
                title: '',
                text: "Marcar la verificación",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
            };
        }
        case 3: {
            return {
                title: '',
                text: "Completar campos obligatorios",
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
            };
        }
    }
}

export function showMessage(tipo) {
    switch (tipo) {
        case 1:
            return Swal.fire('Éxito!', 'El proceso se ejecutó correctamente', 'success');
        case 2:
            return Swal.fire('Ops!', 'El proceso se ejecutó con errores. Si el error persiste, por favor comunicarse con el área de Sistemas.', 'error');
    }
}