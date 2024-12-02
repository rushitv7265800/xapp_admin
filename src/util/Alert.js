import Swal from 'sweetalert2'

export const warning = (confirm) => {
  return Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    iconHtml: '<i class="ri-alert-line"></i>',
    showCancelButton: true,
    confirmButtonText: confirm,
    customClass: {
      confirmButton: 'btn bg-second text-light m15-right',
      cancelButton: 'btn bg-darkGray text-light'
    },
    buttonsStyling: false
  });
};

export const acceptReq = (confirm) => {
  return Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    iconHtml: '<i class="fa-solid fa-circle-check"></i>',
    showCancelButton: true,
    confirmButtonText: confirm,
    confirmButtonText: 'Accept',
    cancelButtonText: 'Cancel',
    customClass: {
      confirmButton: 'btn bg-second text-light m15-right',
      cancelButton: 'btn bg-darkGray text-light'
    },
    buttonsStyling: false
  });
};

export const permissionError = () => {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "You Do'nt Have Permission!",
  });
  
};
