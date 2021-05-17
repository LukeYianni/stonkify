from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from .forms import InvestmentForm
import json

@require_POST
@csrf_exempt
def interest_data(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        form = InvestmentForm(data)
        # Checks the data passed from the server matches the form
        if form.is_valid():
            initialAmount = data.get('initialAmount')
            monthlyDeposit = data.get('monthlyDeposit')
            interestRate = data.get('interestRate')
            monthFlag = data.get('monthFlag')
            last_value = initialAmount
            x_values = range(601)
            y_values = []
            # Effectively always calculates at a monthly frequency, because interest rates are spread over the year
            for x_value in x_values:
                y_values.append(last_value)
                #Caluclates the next month's value, this rounds to 2.d.p to match pence
                last_value=round(last_value*(1 + interestRate/12/100) + monthlyDeposit,2) 

            if( monthFlag=='Years'):
                graph_data = {
                    'xValues': list(range(51)),
                    'yValues': y_values[::12]
                }
            else:
                graph_data = {
                    'xValues': list(x_values),
                    'yValues': y_values
                }
        return JsonResponse(graph_data)